package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateRunRequest struct {
	Title         string                 `json:"title" binding:"required"`
	DistanceKm    float64                `json:"distance_km" binding:"required"`
	DurationSeconds int                  `json:"duration_seconds" binding:"required"`
	AvgPacePerKm  string                 `json:"avg_pace_per_km"`
	CaloriesBurned int                   `json:"calories_burned"`
	RouteData     map[string]interface{} `json:"route_data"`
	StartLocation map[string]float64     `json:"start_location"`
	EndLocation   map[string]float64     `json:"end_location"`
}

type CreateOrderRequest struct {
	ProductType    string                 `json:"product_type" binding:"required"`
	ProductID      *string                `json:"product_id"`
	Amount         float64                `json:"amount" binding:"required"`
	PaymentMethod  string                 `json:"payment_method" binding:"required"`
	PaymentDetails map[string]interface{} `json:"payment_details"`
}

type CreateSupportRequest struct {
	Subject  string `json:"subject" binding:"required"`
	Message  string `json:"message" binding:"required"`
	Priority string `json:"priority"`
}

// Public blog posts
func (s *Server) getPublishedPosts(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	category := c.Query("category")
	search := c.Query("search")

	offset := (page - 1) * limit

	query := s.supabase.From("blog_posts").
		Select("id, title, slug, excerpt, featured_image, category, tags, published_at, profiles!blog_posts_author_id_fkey(full_name)", "", false).
		Eq("published", true).
		Order("published_at", &map[string]interface{}{"ascending": false})

	if category != "" {
		query = query.Eq("category", category)
	}

	if search != "" {
		query = query.Or("title.ilike.%" + search + "%,excerpt.ilike.%" + search + "%")
	}

	result, count, err := query.
		Range(offset, offset+limit-1, "", false).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch blog posts"})
		return
	}

	var posts []map[string]interface{}
	if err := json.Unmarshal(result, &posts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse blog posts"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"posts": posts,
		"pagination": gin.H{
			"page":  page,
			"limit": limit,
			"total": count,
			"pages": (count + limit - 1) / limit,
		},
	})
}

func (s *Server) getPostBySlug(c *gin.Context) {
	slug := c.Param("slug")

	result, _, err := s.supabase.From("blog_posts").
		Select("*, profiles!blog_posts_author_id_fkey(full_name, avatar_url)", "", false).
		Eq("slug", slug).
		Eq("published", true).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog post not found"})
		return
	}

	var post map[string]interface{}
	if err := json.Unmarshal(result, &post); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse blog post"})
		return
	}

	c.JSON(http.StatusOK, post)
}

// Events
func (s *Server) getEvents(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	status := c.DefaultQuery("status", "upcoming")

	offset := (page - 1) * limit

	result, count, err := s.supabase.From("events").
		Select("*", "", false).
		Eq("status", status).
		Order("event_date", &map[string]interface{}{"ascending": true}).
		Range(offset, offset+limit-1, "", false).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch events"})
		return
	}

	var events []map[string]interface{}
	if err := json.Unmarshal(result, &events); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse events"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"events": events,
		"pagination": gin.H{
			"page":  page,
			"limit": limit,
			"total": count,
			"pages": (count + limit - 1) / limit,
		},
	})
}

// User runs
func (s *Server) getUserRuns(c *gin.Context) {
	userID := c.GetString("user_id")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))

	offset := (page - 1) * limit

	result, count, err := s.supabase.From("runs").
		Select("*", "", false).
		Eq("user_id", userID).
		Order("created_at", &map[string]interface{}{"ascending": false}).
		Range(offset, offset+limit-1, "", false).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch runs"})
		return
	}

	var runs []map[string]interface{}
	if err := json.Unmarshal(result, &runs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse runs"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"runs": runs,
		"pagination": gin.H{
			"page":  page,
			"limit": limit,
			"total": count,
			"pages": (count + limit - 1) / limit,
		},
	})
}

func (s *Server) createRun(c *gin.Context) {
	userID := c.GetString("user_id")
	
	var req CreateRunRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	run := map[string]interface{}{
		"id":              uuid.New().String(),
		"user_id":         userID,
		"title":           req.Title,
		"distance_km":     req.DistanceKm,
		"duration_seconds": req.DurationSeconds,
		"avg_pace_per_km": req.AvgPacePerKm,
		"calories_burned": req.CaloriesBurned,
		"route_data":      req.RouteData,
		"created_at":      time.Now().UTC(),
	}

	// Handle location data if provided
	if req.StartLocation != nil {
		if lat, ok := req.StartLocation["lat"]; ok {
			if lng, ok := req.StartLocation["lng"]; ok {
				run["start_location"] = fmt.Sprintf("(%f,%f)", lat, lng)
			}
		}
	}

	if req.EndLocation != nil {
		if lat, ok := req.EndLocation["lat"]; ok {
			if lng, ok := req.EndLocation["lng"]; ok {
				run["end_location"] = fmt.Sprintf("(%f,%f)", lat, lng)
			}
		}
	}

	result, _, err := s.supabase.From("runs").
		Insert(run, false, "", "", "").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create run"})
		return
	}

	var createdRun map[string]interface{}
	if err := json.Unmarshal(result, &createdRun); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse created run"})
		return
	}

	c.JSON(http.StatusCreated, createdRun)
}

// Orders
func (s *Server) createOrder(c *gin.Context) {
	userID := c.GetString("user_id")
	
	var req CreateOrderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Generate order number
	orderNumber := fmt.Sprintf("VSM-%d-%s", time.Now().Unix(), uuid.New().String()[:8])

	order := map[string]interface{}{
		"id":              uuid.New().String(),
		"user_id":         userID,
		"order_number":    orderNumber,
		"product_type":    req.ProductType,
		"product_id":      req.ProductID,
		"amount":          req.Amount,
		"currency":        "VND",
		"status":          "pending",
		"payment_method":  req.PaymentMethod,
		"payment_details": req.PaymentDetails,
		"created_at":      time.Now().UTC(),
		"updated_at":      time.Now().UTC(),
	}

	result, _, err := s.supabase.From("orders").
		Insert(order, false, "", "", "").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	var createdOrder map[string]interface{}
	if err := json.Unmarshal(result, &createdOrder); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse created order"})
		return
	}

	// If it's a premium subscription order, update user profile
	if req.ProductType == "premium" {
		go s.processPremiumSubscription(userID, createdOrder["id"].(string))
	}

	c.JSON(http.StatusCreated, gin.H{
		"order": createdOrder,
		"payment_url": fmt.Sprintf("/payment/%s", createdOrder["id"]),
	})
}

// Support tickets
func (s *Server) createSupportTicket(c *gin.Context) {
	userID := c.GetString("user_id")
	
	var req CreateSupportRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	priority := req.Priority
	if priority == "" {
		priority = "normal"
	}

	ticket := map[string]interface{}{
		"id":         uuid.New().String(),
		"user_id":    userID,
		"subject":    req.Subject,
		"message":    req.Message,
		"status":     "open",
		"priority":   priority,
		"created_at": time.Now().UTC(),
		"updated_at": time.Now().UTC(),
	}

	result, _, err := s.supabase.From("user_responses").
		Insert(ticket, false, "", "", "").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create support ticket"})
		return
	}

	var createdTicket map[string]interface{}
	if err := json.Unmarshal(result, &createdTicket); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse created ticket"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Support ticket created successfully",
		"ticket": createdTicket,
	})
}

// Helper function to process premium subscription
func (s *Server) processPremiumSubscription(userID, orderID string) {
	// In a real implementation, this would integrate with payment processor
	// For now, we'll simulate successful payment processing
	time.Sleep(2 * time.Second)

	// Update order status to paid
	s.supabase.From("orders").
		Update(map[string]interface{}{
			"status":     "paid",
			"updated_at": time.Now().UTC(),
		}, "", "").
		Eq("id", orderID).
		Execute()

	// Update user to premium
	expiresAt := time.Now().AddDate(1, 0, 0) // 1 year from now
	s.supabase.From("profiles").
		Update(map[string]interface{}{
			"is_premium":         true,
			"premium_expires_at": expiresAt.UTC(),
			"updated_at":         time.Now().UTC(),
		}, "", "").
		Eq("id", userID).
		Execute()
}
