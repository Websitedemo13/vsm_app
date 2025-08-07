package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/supabase-community/supabase-go"
)

type Server struct {
	supabase *supabase.Client
	router   *gin.Engine
}

func NewServer() *Server {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_ANON_KEY")

	if supabaseURL == "" || supabaseKey == "" {
		log.Fatal("SUPABASE_URL and SUPABASE_ANON_KEY must be set")
	}

	// Initialize Supabase client
	client, err := supabase.NewClient(supabaseURL, supabaseKey, &supabase.ClientOptions{})
	if err != nil {
		log.Fatal("Failed to create Supabase client:", err)
	}

	// Initialize Gin router
	router := gin.Default()

	// Configure CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	server := &Server{
		supabase: client,
		router:   router,
	}

	server.setupRoutes()
	return server
}

func (s *Server) setupRoutes() {
	// Health check
	s.router.GET("/health", s.healthCheck)

	// Authentication routes
	auth := s.router.Group("/api/auth")
	{
		auth.POST("/login", s.login)
		auth.POST("/register", s.register)
		auth.POST("/logout", s.logout)
		auth.GET("/me", s.authMiddleware(), s.getCurrentUser)
	}

	// User management (Admin only)
	admin := s.router.Group("/api/admin")
	admin.Use(s.authMiddleware(), s.requireRole("admin"))
	{
		admin.GET("/users", s.getAllUsers)
		admin.PUT("/users/:id/role", s.updateUserRole)
		admin.DELETE("/users/:id", s.deleteUser)
		admin.GET("/revenue", s.getRevenueStats)
		admin.GET("/orders", s.getAllOrders)
	}

	// CMS routes (Editor and Admin)
	cms := s.router.Group("/api/cms")
	cms.Use(s.authMiddleware(), s.requireRole("editor", "admin"))
	{
		cms.GET("/posts", s.getBlogPosts)
		cms.POST("/posts", s.createBlogPost)
		cms.PUT("/posts/:id", s.updateBlogPost)
		cms.DELETE("/posts/:id", s.deleteBlogPost)
		cms.POST("/posts/:id/publish", s.publishBlogPost)
		
		cms.GET("/orders", s.getOrders)
		cms.PUT("/orders/:id", s.updateOrderStatus)
		
		cms.GET("/support", s.getSupportTickets)
		cms.PUT("/support/:id", s.respondToTicket)
	}

	// Public API routes
	api := s.router.Group("/api")
	{
		api.GET("/posts", s.getPublishedPosts)
		api.GET("/posts/:slug", s.getPostBySlug)
		api.GET("/events", s.getEvents)
		api.POST("/support", s.authMiddleware(), s.createSupportTicket)
		api.POST("/orders", s.authMiddleware(), s.createOrder)
		api.GET("/runs", s.authMiddleware(), s.getUserRuns)
		api.POST("/runs", s.authMiddleware(), s.createRun)
	}
}

func (s *Server) Start(port string) error {
	log.Printf("Server starting on port %s", port)
	return s.router.Run(":" + port)
}

func main() {
	server := NewServer()
	
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	
	if err := server.Start(port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
