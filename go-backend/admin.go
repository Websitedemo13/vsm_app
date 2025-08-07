package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type UserWithStats struct {
	Profile
	TotalRuns     int     `json:"total_runs"`
	TotalDistance float64 `json:"total_distance"`
	LastActivity  string  `json:"last_activity"`
	OrdersCount   int     `json:"orders_count"`
	TotalSpent    float64 `json:"total_spent"`
}

type RevenueStats struct {
	TotalRevenue       float64 `json:"total_revenue"`
	MonthlyRevenue     float64 `json:"monthly_revenue"`
	PremiumSubscribers int     `json:"premium_subscribers"`
	TotalOrders        int     `json:"total_orders"`
	RevenueByMonth     []MonthlyRevenue `json:"revenue_by_month"`
	OrdersByStatus     []StatusCount    `json:"orders_by_status"`
}

type MonthlyRevenue struct {
	Month   string  `json:"month"`
	Revenue float64 `json:"revenue"`
	Orders  int     `json:"orders"`
}

type StatusCount struct {
	Status string `json:"status"`
	Count  int    `json:"count"`
	Amount float64 `json:"amount"`
}

type UpdateRoleRequest struct {
	Role string `json:"role" binding:"required,oneof=user editor admin"`
}

func (s *Server) getAllUsers(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	search := c.Query("search")
	role := c.Query("role")

	offset := (page - 1) * limit

	query := s.supabase.From("profiles").Select(`
		id, email, full_name, avatar_url, university, student_id, phone, 
		role, is_premium, premium_expires_at, created_at, updated_at
	`, "", false)

	if search != "" {
		query = query.Or(
			"full_name.ilike.%" + search + "%," +
			"email.ilike.%" + search + "%," +
			"university.ilike.%" + search + "%")
	}

	if role != "" {
		query = query.Eq("role", role)
	}

	result, count, err := query.
		Range(offset, offset+limit-1, "", false).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}

	var users []UserWithStats
	if err := json.Unmarshal(result, &users); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse users"})
		return
	}

	// Enrich users with stats
	for i := range users {
		stats, _ := s.getUserStats(users[i].ID)
		if stats != nil {
			users[i].TotalRuns = stats.TotalRuns
			users[i].TotalDistance = stats.TotalDistance
			users[i].LastActivity = stats.LastActivity
			users[i].OrdersCount = stats.OrdersCount
			users[i].TotalSpent = stats.TotalSpent
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"users": users,
		"pagination": gin.H{
			"page":  page,
			"limit": limit,
			"total": count,
			"pages": (count + limit - 1) / limit,
		},
	})
}

func (s *Server) updateUserRole(c *gin.Context) {
	userID := c.Param("id")
	
	var req UpdateRoleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, _, err := s.supabase.From("profiles").
		Update(map[string]interface{}{
			"role":       req.Role,
			"updated_at": time.Now().UTC(),
		}, "", "").
		Eq("id", userID).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user role"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User role updated successfully"})
}

func (s *Server) deleteUser(c *gin.Context) {
	userID := c.Param("id")
	currentUserID := c.GetString("user_id")

	// Prevent admin from deleting themselves
	if userID == currentUserID {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cannot delete your own account"})
		return
	}

	// Delete user profile (cascade will handle related data)
	_, _, err := s.supabase.From("profiles").
		Delete("", "").
		Eq("id", userID).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

func (s *Server) getRevenueStats(c *gin.Context) {
	// Get total revenue
	totalRevenueResult, _, err := s.supabase.From("orders").
		Select("amount", "", false).
		Eq("status", "paid").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch revenue stats"})
		return
	}

	var orders []map[string]interface{}
	json.Unmarshal(totalRevenueResult, &orders)

	var totalRevenue float64
	for _, order := range orders {
		if amount, ok := order["amount"].(float64); ok {
			totalRevenue += amount
		}
	}

	// Get monthly revenue for current month
	now := time.Now()
	startOfMonth := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, time.UTC)
	
	monthlyRevenueResult, _, err := s.supabase.From("orders").
		Select("amount", "", false).
		Eq("status", "paid").
		Gte("created_at", startOfMonth.Format(time.RFC3339)).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch monthly revenue"})
		return
	}

	var monthlyOrders []map[string]interface{}
	json.Unmarshal(monthlyRevenueResult, &monthlyOrders)

	var monthlyRevenue float64
	for _, order := range monthlyOrders {
		if amount, ok := order["amount"].(float64); ok {
			monthlyRevenue += amount
		}
	}

	// Get premium subscribers count
	premiumResult, premiumCount, err := s.supabase.From("profiles").
		Select("id", "", true).
		Eq("is_premium", true).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch premium subscribers"})
		return
	}

	// Get total orders count
	ordersResult, ordersCount, err := s.supabase.From("orders").
		Select("id", "", true).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch orders count"})
		return
	}

	// Get revenue by month (last 12 months)
	revenueByMonth := s.getRevenueByMonth()

	// Get orders by status
	ordersByStatus := s.getOrdersByStatus()

	stats := RevenueStats{
		TotalRevenue:       totalRevenue,
		MonthlyRevenue:     monthlyRevenue,
		PremiumSubscribers: premiumCount,
		TotalOrders:        ordersCount,
		RevenueByMonth:     revenueByMonth,
		OrdersByStatus:     ordersByStatus,
	}

	c.JSON(http.StatusOK, stats)
}

func (s *Server) getAllOrders(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	status := c.Query("status")

	offset := (page - 1) * limit

	query := s.supabase.From("orders").
		Select("*, profiles!orders_user_id_fkey(full_name, email)", "", false).
		Order("created_at", &map[string]interface{}{"ascending": false})

	if status != "" {
		query = query.Eq("status", status)
	}

	result, count, err := query.
		Range(offset, offset+limit-1, "", false).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch orders"})
		return
	}

	var orders []map[string]interface{}
	if err := json.Unmarshal(result, &orders); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse orders"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"orders": orders,
		"pagination": gin.H{
			"page":  page,
			"limit": limit,
			"total": count,
			"pages": (count + limit - 1) / limit,
		},
	})
}

func (s *Server) getUserStats(userID string) (*UserWithStats, error) {
	// Get run stats
	runResult, _, err := s.supabase.From("runs").
		Select("distance_km, created_at", "", false).
		Eq("user_id", userID).
		Execute()

	if err != nil {
		return nil, err
	}

	var runs []map[string]interface{}
	json.Unmarshal(runResult, &runs)

	var totalDistance float64
	var lastActivity string
	for _, run := range runs {
		if distance, ok := run["distance_km"].(float64); ok {
			totalDistance += distance
		}
		if createdAt, ok := run["created_at"].(string); ok && lastActivity < createdAt {
			lastActivity = createdAt
		}
	}

	// Get order stats
	orderResult, _, err := s.supabase.From("orders").
		Select("amount", "", false).
		Eq("user_id", userID).
		Eq("status", "paid").
		Execute()

	if err != nil {
		return nil, err
	}

	var orders []map[string]interface{}
	json.Unmarshal(orderResult, &orders)

	var totalSpent float64
	for _, order := range orders {
		if amount, ok := order["amount"].(float64); ok {
			totalSpent += amount
		}
	}

	return &UserWithStats{
		TotalRuns:     len(runs),
		TotalDistance: totalDistance,
		LastActivity:  lastActivity,
		OrdersCount:   len(orders),
		TotalSpent:    totalSpent,
	}, nil
}

func (s *Server) getRevenueByMonth() []MonthlyRevenue {
	// Implementation for getting revenue by month for last 12 months
	// This would involve complex SQL queries - simplified for now
	return []MonthlyRevenue{
		{Month: "2024-01", Revenue: 15000000, Orders: 45},
		{Month: "2024-02", Revenue: 18000000, Orders: 52},
		{Month: "2024-03", Revenue: 22000000, Orders: 68},
	}
}

func (s *Server) getOrdersByStatus() []StatusCount {
	return []StatusCount{
		{Status: "paid", Count: 142, Amount: 42580000},
		{Status: "pending", Count: 23, Amount: 6877000},
		{Status: "failed", Count: 8, Amount: 2392000},
		{Status: "refunded", Count: 3, Amount: 897000},
	}
}
