package openapi

import (
	"fmt"
	"github.com/GIT_USER_ID/GIT_REPO_ID/go/models"
	"github.com/gin-gonic/gin"
)


// Function is used to allow for checking if a session id exists when a request is made from the client
// If a cookie exists the request continues, otherwise the un-auth user is logged out
// TODO - Compare the session id to the user that is logged in session id - Can be felt for now
func checkForCookie(c *gin.Context) bool {

	val, err := c.Cookie("session_id")
	fmt.Println("Cookie:", val)

	// Logout if no session_id is found
	if err != nil {
		fmt.Println(err)
		//Logout(c)
		return false
	}
	// Else return true as one exists
	return true
}

func Logout(c *gin.Context) {
	c.JSON(200, models.Error{Code: 200, Messages: "Logout out"})
}
