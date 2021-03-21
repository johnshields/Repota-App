/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * Main function to start server.
 */

package main

import (
	"fmt"
	sw "github.com/GIT_USER_ID/GIT_REPO_ID/go"
	_ "github.com/gin-gonic/gin"
	"log"
)

// CORS are set up in ./go/routers.go
func main() {
	router := sw.NewRouter()
	fmt.Println("[INFO] Horton is starting...")

	// start up router
	err := router.Run()
	if err != nil {
		log.Fatal(err)
	}
}
