/*
 * John Shields
 * Horton API - Tests
 *
 * Account API Test
 * Tests for Register & Login
 * Registers a Mock User and Logins in the user to the Mock DB.
 */

package tests

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/GIT_USER_ID/GIT_REPO_ID/go/models"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"testing"
)

// Function to register a Mock User by sending request to /register endpoint.
// Test the functions - Register, RegisterNewUser, createSessionId & isValidAccount.
// Passes if a new User has been registered into the database and a session has been generated
// for the user.
func TestRegister(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing Register...")

	t.Run("register", func(t *testing.T) {
		// Set up InLineObject Payload.
		body := &models.InlineObject{
			Username: "test_user",
			Name:     "Test",
			Password: "@Testing14",
		}

		// Encode InLineObject.
		payloadBuf := new(bytes.Buffer)
		err := json.NewEncoder(payloadBuf).Encode(body)
		if err != nil {
			log.Println("Unable to Encode", err)
		}

		// Set up /register request.
		url := "http://localhost:8080/api/v1/register"
		req, err := http.NewRequest("POST", url, payloadBuf)
		if err != nil {
			log.Println(err)
		}
		// Do POST request (Register User).
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "200 OK" {
			// TEST PASSED
			fmt.Println("\n[PASS] User was Registered successfully")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to Register User", err)
			t.Fail()
		}
	})
}

// Function to login a Mock User by sending request to /login endpoint.
// Tests the Functions - Login, verifyDetails, removeSession & createSessionId.
// Passes if the user is logged in and a cookie has been set for the user.
func TestLogin(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing Login...")

	t.Run("login", func(t *testing.T) {
		// Set up InLineObject Payload.
		body := &models.InlineObject{
			Username: "test_user",
			Password: "@Testing14",
		}

		// Encode InLineObject.
		payloadBuf := new(bytes.Buffer)
		err := json.NewEncoder(payloadBuf).Encode(body)
		if err != nil {
			log.Println("Unable to Encode", err)
		}

		// Set up /login request.
		url := "http://localhost:8080/api/v1/login"
		req, err := http.NewRequest("POST", url, payloadBuf)
		if err != nil {
			log.Println(err)
		}

		// Do POST request (Login User).
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "204 No Content" {
			// TEST PASSED
			fmt.Println("\n[PASS] Logged in User")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to Login User", err)
			t.Fail()
		}
	})
}

// Function to test Logout by sending request to /logout endpoint.
// Tests the Functions - Logout, removeSession & createSessionId.
// Passes if User is logged out after one second cookie is expired.
func TestLogout(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing Logout...")

	t.Run("logout", func(t *testing.T) {
		// Set up /logout request.
		url := "http://localhost:8080/api/v1/logout"
		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			log.Println(err)
		}
		// Do GET request (Logout User).
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "204 No Content" {
			// TEST PASSED
			fmt.Println("\n[PASS] succeeded to logout User")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to logout User", err)
			t.Fail()
		}
	})
}
