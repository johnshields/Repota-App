package openapi

import (
	"fmt"
	"github.com/GIT_USER_ID/GIT_REPO_ID/go/models"
	"github.com/gin-gonic/gin"
	"log"
)


// Function is used to allow for checking if a session id exists when a request is made from the client
// If a cookie exists the request continues, otherwise the un-auth user is logged out


func CheckForCookie(c *gin.Context) bool {
	val, err := c.Cookie("session_id")
	fmt.Println("Cookie:", val)

	// Logout if no session_id is found
	if err != nil {
		log.Println("[ALERT]", err)
		//Logout(c)
		return false
	}
	// Else return true as one exists
	return true
}

func Logout(c *gin.Context) {
	c.JSON(200, models.Error{Code: 200, Messages: "[INFO] Worker logged out."})
}
