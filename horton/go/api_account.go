/*
 * John Shields
 * Horton
 *
 * Account API
 * Handles Register & Login
 *
 * API version: 1.0.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	"errors"
	"fmt"
	"github.com/GIT_USER_ID/GIT_REPO_ID/go/config"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"log"
	"strings"
)

var wa WorkerAccount

// Login - Log in
func Login(c *gin.Context) {
	db := config.DbConn()

	// Object to bind data too
	var workerForm WorkerAccount

	if err := c.BindJSON(&workerForm); err != nil {
		fmt.Println(err.Error())
	}

	username := workerForm.Username
	password := workerForm.Password

	// Check if user exist in the database and check password is not null
	if err := verifyDetails(username, password); err != nil {
		fmt.Println("[INFO] Credentials Error:", err)
		c.JSON(400, Error{Code: 400, Messages: "Malformed Request"})
		return // Return as there is issues with the credentials
	}

	// Compare the hash in the db with the user password provided in the request
	if err := bcrypt.CompareHashAndPassword([]byte(wa.Password), []byte(password)); err == nil {
		fmt.Println("[INFO] User logged in.")

		// Check for current session id on the user trying to login
		// if exists remove
		// create new one, add to db and set-header on client in response
		err, token := createSessionId(username)

		if err != nil {
			fmt.Print(err)
			c.JSON(500, Error{Code: 500, Messages: "Internal Server Error"})
		} else {
			c.JSON(200, token)
		}
	} else {
		fmt.Print(err)
		log.Println("\n[INFO] User not logged in!")
		// Change message
		c.JSON(400, Error{Code: 400, Messages: "Malformed Request"})
	}

	defer db.Close()

}

// Function that registers a new user to the database.
// Check password for null
// Check if user exists
func verifyDetails(username, password string) error {

	fmt.Println("\n[INFO] Processing User Details...",
		"\nEntered username:", username, "\nEntered Password:", password)

	if strings.TrimSpace(password) == "" {
		log.Printf("password is null")
		return errors.New("password is null")
	} else if isValidAccount(username) {
		log.Printf("unknown username")
		return errors.New("username does not exist")
	} else {
		return nil
	}
}

// Register - Registers User
func Register(c *gin.Context) {
	var user InlineObject

	// Blind data to object, else throw error
	if err := c.BindJSON(&user); err != nil {
		fmt.Println(err.Error())
	}

	username := user.Username
	password := user.Password

	if err := registerNewUser(username, user.Name, password); err == nil {

		err, token := createSessionId(username)

		if err != nil {
			fmt.Print(err)
			c.JSON(500, Error{Code: 500, Messages: "Internal Server Error"})
		} else {
			c.JSON(200, token)
		}
	} else {
		log.Printf("\n[INFO] Not completing request")
	}
}

// Function to create a session id for a user
func createSessionId(username string) (error, string) {
	db := config.DbConn()

	// User has been created now set the following below
	token := generateSessionId() // Create a new session ID
	expiry := 3600 * 24 * 3      // 3600 * 24 * 3 = 3 days

	// INSERT QUERY to create an Account
	insert, err := db.Prepare("INSERT INTO session(id, user, expire_after) VALUES(?, ?, ?)")

	if err != nil {
		fmt.Println(err.Error())
		return errors.New(err.Error()), ""
	}

	fmt.Println("\n[INFO] Printing Worker Account details:", "\nSession Token:", token, "\nWorker ID:", wa.Id,
		"\nExpiry time in seconds:", expiry)

	// Check for worker account before committing session record
	if isValidAccount(username); err != nil {
		log.Println("\n[INFO] Error doing worker account lookup in database")
	}

	if _, err = insert.Exec(token, wa.Id, expiry); err != nil {
		log.Println("MYSQL Error: Error creating new session record\n", err)
		defer db.Close()
		return errors.New("MYSQL Error: Error creating new session record"), ""
	} else {
		fmt.Println("\n[INFO] Session has been generated. Records:", "\nSession Token:", token, "\nWorker ID:", wa.Id,
			"\nExpiry time in seconds:", expiry)
		fmt.Println("\n[INFO] Worker Username:", username)
		defer db.Close()

		return nil, token // Return token, no errors
	}

}

// Function to create a session ID using UUID for an authenticated user.
// This session id will be needed to allow the user to make requests from the client to the server.
func generateSessionId() string {
	return uuid.New().String()
}

// Function that registers a new user to the database.
func registerNewUser(username, name, password string) error {
	db := config.DbConn()

	fmt.Println("\n[INFO] Processing User Details...",
		"\nEntered username:", username, "\nEntered Password:", password)

	if strings.TrimSpace(password) == "" {
		log.Printf("password is null")
		return errors.New("password is null")
	} else if !isValidAccount(username) {
		log.Printf("username taken")
		return errors.New("username is already taken")
	}

	// Hash the password here
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		log.Fatal("Hash Password failed: ", err)
	}

	insert, err := db.Prepare("INSERT INTO workers(username, worker_name, hash) VALUES (?, ?, ?)")

	if err != nil {
		log.Println("MySQL Error: Error Creating new user account:\n", err)
	}

	result, err := insert.Exec(username, name, hashedPassword)

	if err != nil {
		log.Println("MySQL Error: Error Creating new user account:\n", err)
	}

	fmt.Println("Print MySQL Results for user account:\n", result)

	defer db.Close()
	// Everything is good
	return nil
}

// Function to do a database look up and check if a username matches one provided.
func isValidAccount(username string) bool {
	db := config.DbConn()

	selDB, err := db.Query("SELECT * FROM workers WHERE username=?", username)

	if err != nil {
		log.Fatal(err)
	}

	if selDB.Next() {
		err = selDB.Scan(&wa.Id, &wa.Username, &wa.WorkerName, &wa.Password)

		if err != nil {
			// return false // No user matching username provided
			log.Println("MySQL Error:\n", err)
		}
		defer db.Close()
		// Username matches return false as its not valid
		return false
	} else {
		// Return true, username is valid as no user exist by it in the database.
		defer db.Close()
		return true
	}
}
