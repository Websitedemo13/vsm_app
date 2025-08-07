package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/supabase-community/gotrue-go"
)

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type RegisterRequest struct {
	Email      string `json:"email" binding:"required,email"`
	Password   string `json:"password" binding:"required,min=6"`
	FullName   string `json:"full_name" binding:"required"`
	University string `json:"university"`
	StudentID  string `json:"student_id"`
	Phone      string `json:"phone"`
}

type Profile struct {
	ID               string `json:"id"`
	Email            string `json:"email"`
	FullName         string `json:"full_name"`
	AvatarURL        string `json:"avatar_url"`
	University       string `json:"university"`
	StudentID        string `json:"student_id"`
	Phone            string `json:"phone"`
	Role             string `json:"role"`
	IsPremium        bool   `json:"is_premium"`
	PremiumExpiresAt string `json:"premium_expires_at"`
	CreatedAt        string `json:"created_at"`
	UpdatedAt        string `json:"updated_at"`
}

func (s *Server) healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"service": "VSM API Server",
		"version": "1.0.0",
	})
}

func (s *Server) login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Authenticate with Supabase Auth
	user, err := s.supabase.Auth.SignInWithEmailPassword(req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Get user profile
	profile, err := s.getUserProfile(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token": user.AccessToken,
		"refresh_token": user.RefreshToken,
		"user": profile,
	})
}

func (s *Server) register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create user with Supabase Auth
	user, err := s.supabase.Auth.SignUp(gotrue.SignUpRequest{
		Email:    req.Email,
		Password: req.Password,
		Data: map[string]interface{}{
			"full_name":  req.FullName,
			"university": req.University,
			"student_id": req.StudentID,
			"phone":      req.Phone,
		},
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully",
		"user_id": user.ID,
		"email":   user.Email,
	})
}

func (s *Server) logout(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No token provided"})
		return
	}

	token = strings.TrimPrefix(token, "Bearer ")
	
	err := s.supabase.Auth.SignOut(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to logout"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}

func (s *Server) getCurrentUser(c *gin.Context) {
	userID := c.GetString("user_id")
	
	profile, err := s.getUserProfile(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user profile"})
		return
	}

	c.JSON(http.StatusOK, profile)
}

func (s *Server) getUserProfile(userID string) (*Profile, error) {
	var profile Profile
	
	result, _, err := s.supabase.From("profiles").
		Select("*", "", false).
		Eq("id", userID).
		Single().
		Execute()
	
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(result, &profile); err != nil {
		return nil, err
	}

	return &profile, nil
}

// Middleware to authenticate requests
func (s *Server) authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "No token provided"})
			c.Abort()
			return
		}

		token = strings.TrimPrefix(token, "Bearer ")
		
		user, err := s.supabase.Auth.GetUser(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Get user profile to check role
		profile, err := s.getUserProfile(user.ID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user profile"})
			c.Abort()
			return
		}

		c.Set("user_id", user.ID)
		c.Set("user_email", user.Email)
		c.Set("user_role", profile.Role)
		c.Set("user_profile", profile)
		c.Next()
	}
}

// Middleware to check user role
func (s *Server) requireRole(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userRole := c.GetString("user_role")
		
		for _, role := range roles {
			if userRole == role {
				c.Next()
				return
			}
		}

		c.JSON(http.StatusForbidden, gin.H{"error": fmt.Sprintf("Requires one of roles: %v", roles)})
		c.Abort()
	}
}
