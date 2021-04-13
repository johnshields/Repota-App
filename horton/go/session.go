/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * Session
 * Handles  cookie checking, creating, generating and removing sessions.
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

// CheckForCookie
// Check if user has a cookie - Used to abort requests made from the client if a user has no cookie (not logged in).
func CheckForCookie(c *gin.Context) bool {
	val, err := c.Cookie("session_id")
	fmt.Println("\nCookie:", val)

	// Return false if no cookie is found.
	if err != nil {
		c.JSON(403, models.Error{Code: 403, Messages: "User is unauthorized"})
		return false
	}
	// Else return true as one exists.
	return true
}

// Function to create a session ID for authenticated user.
// Works with generateSessionId & isValidAccount.
// Session tables is updated with the session token (UUID) and expiry time of three days and that is tied to the user
// by the user's ID.
// Returns either an error or a new Session object containing session token and expiry time.
func createSessionId(username string) (error, models.Session) {
	db := config.DbConn()
	//db := mocks.MockDbConn() // for unit tests

	// Set up the session requirements.
	token := generateSessionId() // Create a new session ID
	expiry := 3600 * 24 * 3      // 3600 * 24 * 3 = 3 days

	// Prepare Insert Query to create session for user.
	insert, err := db.Prepare("INSERT INTO session(id, user, expire_after) VALUES(?, ?, ?)")

	if err != nil {
		fmt.Println(err.Error())
		return errors.New(err.Error()), models.Session{}
	}

	fmt.Println("\n[INFO] Printing Worker Account details:", "\nSession Token:", token, "\nWorker ID:", wa.Id,
		"\nExpiry time in seconds:", expiry)

	// Check if user account exists - mainly for attaching session to user.
	if !isValidAccount(username) {
		log.Println("\nUser has not logged in.", err)
	}

	// Execute query to db (create session for user), handle errors if any.
	if _, err = insert.Exec(token, wa.Id, expiry); err != nil {
		log.Println("MYSQL Error: Error creating new session record\n", err)
		defer db.Close()
		return errors.New("MYSQL Error: Error creating new session record"), models.Session{}
	} else {
		fmt.Println("\n[INFO] Session has been generated for", username)
		defer db.Close()
		// Returns Session object.
		return nil, models.Session{Token: token, Expiry: expiry}
	}
}

// Function to create a session ID using UUID (Universally Unique ID) for an authenticated user.
// This ID will be needed for users and their cookies to allow the user to make requests from the client to the server.
func generateSessionId() string {
	return uuid.New().String()
}

// Function to remove existing session for an authenticated user so it can be replaced by a new one.
func removeSession(userId int) bool {
	db := config.DbConn()
	//db := mocks.MockDbConn() // for unit tests

	// Delete session for user.
	res, err := db.Exec("DELETE FROM session WHERE user=?", userId)

	if err != nil {
		log.Println("MySQL Error: Deleting of session failed", err)
		return false
	}

	affectedRows, err := res.RowsAffected()
	if err != nil {
		// return false
		fmt.Printf("\nError updating record for deleting session")
		return false
	}

	fmt.Printf("The statement affected %d rows\n", affectedRows)
	return true // Session has been removed.
}
