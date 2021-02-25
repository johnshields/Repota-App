/*
 * John Shields
 * Horton
 * API version: 1.0.0
 *
 * Session
 * Handles creating, generating, removing sessions and cookie checking.
 */

package openapi

import (
	"errors"
	"fmt"
	"github.com/GIT_USER_ID/GIT_REPO_ID/go/config"
	"github.com/GIT_USER_ID/GIT_REPO_ID/go/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"log"
)

// Function is used to allow for checking if a session id exists when a request is made from the client.
// If a cookie exists the request continues, otherwise the un-auth user is logged out.
func CheckForCookie(c *gin.Context) bool {
	val, err := c.Cookie("session_id")
	fmt.Println("Cookie:", val)

	// Logout if no session_id is found
	if err != nil {
		log.Println("[ALERT] no cookie found", err)
		Logout(c)
		return false
	}
	// Else return true as one exists
	return true
}

// Function to create a session id for authenticated user.
// Session tables is updated with the session token(UUID) and expiry time of three days and that is tied to the user by
// by the users id.
// Returns either an error or a new Session object containing session token and expiry time.
func createSessionId(username string) (error, models.Session) {
	db := config.DbConn()

	// User has been created now set the following below
	token := generateSessionId() // Create a new session ID
	expiry := 3600 * 24 * 3      // 3600 * 24 * 3 = 3 days

	// INSERT QUERY to create an Account
	insert, err := db.Prepare("INSERT INTO session(id, user, expire_after) VALUES(?, ?, ?)")

	if err != nil {
		fmt.Println(err.Error())
		return errors.New(err.Error()), models.Session{}
	}

	fmt.Println("\n[INFO] Printing Worker Account details:", "\nSession Token:", token, "\nWorker ID:", wa.Id,
		"\nExpiry time in seconds:", expiry)

	// Check if user account exists
	if !isValidAccount(username) {
		log.Println("\n[ALERT] User has not logged in!", err)
	}

	// Execute query to db, handle errors if any
	if _, err = insert.Exec(token, wa.Id, expiry); err != nil {
		log.Println("[ALERT] MYSQL Error: Error creating new session record\n", err)
		defer db.Close()
		return errors.New("[ALERT] MYSQL Error: Error creating new session record"), models.Session{}
	} else {
		fmt.Println("\n[INFO] Session has been generated. Records:", "\nSession Token:", token, "\nWorker ID:", wa.Id,
			"\nExpiry time in seconds:", expiry)
		fmt.Println("\n[INFO] Worker Username:", username)
		defer db.Close()

		// Returns Session object
		return nil, models.Session{Token: token, Expiry: expiry}
	}
}

// Function to create a session ID using UUID for an authenticated user.
// This session id will be needed to allow the user to make requests from the client to the server.
func generateSessionId() string {
	return uuid.New().String()
}

// Function to remove existing session for an authenticated user so it can be replaced by a new one.
func removeSession(userId int) bool {
	db := config.DbConn()

	//Create query
	res, err := db.Exec("DELETE FROM session WHERE user=?", userId)

	if err != nil {
		fmt.Printf("Query error")
		return false
	}

	affectedRows, err := res.RowsAffected()

	if err != nil {
		// return false
		fmt.Printf("\n[ALERT] Error updating record for deleting session")
		return false
	}

	fmt.Printf("The statement affected %d rows\n", affectedRows)
	return true
}

// Function to logout a user.
func Logout(c *gin.Context) {
	c.JSON(200, models.Error{Code: 200, Messages: "Worker logged out."})
}
