/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * Routers
 * Setup all routes for API.
 * Handles GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH for requests and responses.
 * Handles CORS for cross origins to front-end.
 * Handles Endpoint Routes for functions for reports and users.
 *
 * References
 * https://stackoverflow.com/questions/29418478/go-gin-framework-cors
 * https://semaphoreci.com/community/tutorials/building-go-web-applications-and-microservices-using-gin
 */

package openapi

import (
	_ "fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Route is the information for every URI.
type Route struct {
	// Name is the name of this Route.
	Name string
	// Method is the string for the HTTP method. e.g. GET, POST, DELETE etc.
	Method string
	// Pattern is the pattern of the URI.
	Pattern string
	// HandlerFunc is the handler function of this route.
	HandlerFunc gin.HandlerFunc
}

// Routes is the list of the generated Route.
type Routes []Route

// CORS - To handle cross origin issues.
func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", c.Request.Header.Get("Origin"))
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

// NewRouter returns a new router.
func NewRouter() *gin.Engine {

	router := gin.Default()
	// Set logo for tab & "/" endpoint.
	router.StaticFile("/favicon.ico", "./favicon.ico")
	router.StaticFile("/", "./favicon.ico")

	// CORS must be called before any routes are called.
	router.Use(CORS())
	for _, route := range routes {
		switch route.Method {
		case http.MethodGet:
			router.GET(route.Pattern, route.HandlerFunc)
		case http.MethodPost:
			router.POST(route.Pattern, route.HandlerFunc)
		case http.MethodPut:
			router.PUT(route.Pattern, route.HandlerFunc)
		case http.MethodDelete:
			router.DELETE(route.Pattern, route.HandlerFunc)
		}
	}

	return router
}

// Index is the index handler - /api/v1/ endpoint.
func Index(c *gin.Context) {
	c.String(http.StatusOK, "[INFO] Horton is online...")
}

// HTTP methods, RESTful Route endpoints and Handler Functions.
var routes = Routes{
	{
		"Index",
		http.MethodGet,
		"/api/v1/",
		Index,
	},

	{
		"Login",
		http.MethodPost,
		"/api/v1/login",
		Login,
	},

	{
		"Logout",
		http.MethodGet,
		"/api/v1/logout",
		Logout,
	},

	{
		"Register",
		http.MethodPost,
		"/api/v1/register",
		Register,
	},

	{
		"CreateReport",
		http.MethodPost,
		"/api/v1/jobReports",
		CreateReport,
	},

	{
		"DeleteReport",
		http.MethodDelete,
		"/api/v1/jobReports/:jobReportId",
		DeleteReport,
	},

	{
		"GetReportById",
		http.MethodGet,
		"/api/v1/jobReports/:jobReportId",
		GetReportById,
	},

	{
		"GetReports",
		http.MethodGet,
		"/api/v1/jobReports",
		GetReports,
	},

	{
		"UpdateReport",
		http.MethodPut,
		"/api/v1/jobReports/:jobReportId",
		UpdateReport,
	},

	{
		"CarApiData",
		http.MethodGet,
		"/api/v1/carApiData",
		GetCarApiData,
	},
}
