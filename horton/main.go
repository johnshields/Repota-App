/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * Main function to start server by running routers.
 */

package main

import (
	"fmt"
	sw "github.com/GIT_USER_ID/GIT_REPO_ID/go"
	_ "github.com/gin-gonic/gin"
	"log"
)

// Routes & CORS are set up in ./go/routers.go
func main() {
	router := sw.NewRouter()
	fmt.Println("[INFO] Horton is starting...")

	// Start up router.
	err := router.Run()
	if err != nil {
		log.Fatal(err)
	}
}
