/*
 * Horton Golang Server
 * John Shields
 * API version: 1.0.0
 *
 * Main function to start server.
 */

package main

import (
	sw "github.com/GIT_USER_ID/GIT_REPO_ID/go"
	_ "github.com/gin-gonic/gin"
	"log"
)

// CORS are set up in ./go/routers.go
func main() {
	router := sw.NewRouter()
	log.Println("Horton started on: http://horton.eu-west-1.elasticbeanstalk.com") // AWS Elastic Beanstalk
	router.Run()
}
