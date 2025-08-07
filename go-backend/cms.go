package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type BlogPost struct {
	ID           string    `json:"id"`
	Title        string    `json:"title"`
	Slug         string    `json:"slug"`
	Content      string    `json:"content"`
	Excerpt      string    `json:"excerpt"`
	FeaturedImage string   `json:"featured_image"`
	AuthorID     string    `json:"author_id"`
	Category     string    `json:"category"`
	Tags         []string  `json:"tags"`
	Published    bool      `json:"published"`
	PublishedAt  *string   `json:"published_at"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type CreatePostRequest struct {
	Title         string   `json:"title" binding:"required"`
	Content       string   `json:"content" binding:"required"`
	Excerpt       string   `json:"excerpt"`
	FeaturedImage string   `json:"featured_image"`
	Category      string   `json:"category"`
	Tags          []string `json:"tags"`
}

type Order struct {
	ID             string                 `json:"id"`
	UserID         string                 `json:"user_id"`
	OrderNumber    string                 `json:"order_number"`
	ProductType    string                 `json:"product_type"`
	ProductID      *string                `json:"product_id"`
	Amount         float64                `json:"amount"`
	Currency       string                 `json:"currency"`
	Status         string                 `json:"status"`
	PaymentMethod  *string                `json:"payment_method"`
	PaymentDetails map[string]interface{} `json:"payment_details"`
	CreatedAt      time.Time              `json:"created_at"`
	UpdatedAt      time.Time              `json:"updated_at"`
}

type SupportTicket struct {
	ID           string  `json:"id"`
	UserID       string  `json:"user_id"`
	Subject      string  `json:"subject"`
	Message      string  `json:"message"`
	Response     *string `json:"response"`
	RespondedBy  *string `json:"responded_by"`
	Status       string  `json:"status"`
	Priority     string  `json:"priority"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type UpdateOrderRequest struct {
	Status string `json:"status" binding:"required,oneof=pending paid failed refunded"`
}

type RespondToTicketRequest struct {
	Response string `json:"response" binding:"required"`
}

// Blog Posts Management
func (s *Server) getBlogPosts(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	category := c.Query("category")
	published := c.Query("published")

	offset := (page - 1) * limit

	query := s.supabase.From("blog_posts").
		Select("*, profiles!blog_posts_author_id_fkey(full_name, email)", "", false).
		Order("created_at", &map[string]interface{}{"ascending": false})

	if category != "" {
		query = query.Eq("category", category)
	}

	if published != "" {
		publishedBool, _ := strconv.ParseBool(published)
		query = query.Eq("published", publishedBool)
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

func (s *Server) createBlogPost(c *gin.Context) {
	var req CreatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetString("user_id")
	slug := generateSlug(req.Title)

	post := map[string]interface{}{
		"id":             uuid.New().String(),
		"title":          req.Title,
		"slug":           slug,
		"content":        req.Content,
		"excerpt":        req.Excerpt,
		"featured_image": req.FeaturedImage,
		"author_id":      userID,
		"category":       req.Category,
		"tags":           req.Tags,
		"published":      false,
		"created_at":     time.Now().UTC(),
		"updated_at":     time.Now().UTC(),
	}

	result, _, err := s.supabase.From("blog_posts").
		Insert(post, false, "", "", "").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog post"})
		return
	}

	var createdPost BlogPost
	if err := json.Unmarshal(result, &createdPost); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse created post"})
		return
	}

	c.JSON(http.StatusCreated, createdPost)
}

func (s *Server) updateBlogPost(c *gin.Context) {
	postID := c.Param("id")
	
	var req CreatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	slug := generateSlug(req.Title)

	updateData := map[string]interface{}{
		"title":          req.Title,
		"slug":           slug,
		"content":        req.Content,
		"excerpt":        req.Excerpt,
		"featured_image": req.FeaturedImage,
		"category":       req.Category,
		"tags":           req.Tags,
		"updated_at":     time.Now().UTC(),
	}

	_, _, err := s.supabase.From("blog_posts").
		Update(updateData, "", "").
		Eq("id", postID).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update blog post"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog post updated successfully"})
}

func (s *Server) deleteBlogPost(c *gin.Context) {
	postID := c.Param("id")

	_, _, err := s.supabase.From("blog_posts").
		Delete("", "").
		Eq("id", postID).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete blog post"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog post deleted successfully"})
}

func (s *Server) publishBlogPost(c *gin.Context) {
	postID := c.Param("id")

	updateData := map[string]interface{}{
		"published":     true,
		"published_at":  time.Now().UTC(),
		"updated_at":    time.Now().UTC(),
	}

	_, _, err := s.supabase.From("blog_posts").
		Update(updateData, "", "").
		Eq("id", postID).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to publish blog post"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog post published successfully"})
}

// Orders Management
func (s *Server) getOrders(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	status := c.Query("status")

	offset := (page - 1) * limit

	query := s.supabase.From("orders").
		Select("*, profiles!orders_user_id_fkey(full_name, email, phone)", "", false).
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

func (s *Server) updateOrderStatus(c *gin.Context) {
	orderID := c.Param("id")
	
	var req UpdateOrderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updateData := map[string]interface{}{
		"status":     req.Status,
		"updated_at": time.Now().UTC(),
	}

	_, _, err := s.supabase.From("orders").
		Update(updateData, "", "").
		Eq("id", orderID).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update order status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order status updated successfully"})
}

// Support Tickets Management
func (s *Server) getSupportTickets(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	status := c.Query("status")
	priority := c.Query("priority")

	offset := (page - 1) * limit

	query := s.supabase.From("user_responses").
		Select("*, profiles!user_responses_user_id_fkey(full_name, email)", "", false).
		Order("created_at", &map[string]interface{}{"ascending": false})

	if status != "" {
		query = query.Eq("status", status)
	}

	if priority != "" {
		query = query.Eq("priority", priority)
	}

	result, count, err := query.
		Range(offset, offset+limit-1, "", false).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch support tickets"})
		return
	}

	var tickets []map[string]interface{}
	if err := json.Unmarshal(result, &tickets); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse support tickets"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"tickets": tickets,
		"pagination": gin.H{
			"page":  page,
			"limit": limit,
			"total": count,
			"pages": (count + limit - 1) / limit,
		},
	})
}

func (s *Server) respondToTicket(c *gin.Context) {
	ticketID := c.Param("id")
	userID := c.GetString("user_id")
	
	var req RespondToTicketRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updateData := map[string]interface{}{
		"response":      req.Response,
		"responded_by":  userID,
		"status":        "resolved",
		"updated_at":    time.Now().UTC(),
	}

	_, _, err := s.supabase.From("user_responses").
		Update(updateData, "", "").
		Eq("id", ticketID).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to respond to ticket"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Response sent successfully"})
}

// Helper function to generate slug from title
func generateSlug(title string) string {
	slug := strings.ToLower(title)
	slug = strings.ReplaceAll(slug, " ", "-")
	slug = strings.ReplaceAll(slug, ".", "")
	slug = strings.ReplaceAll(slug, ",", "")
	return slug
}
