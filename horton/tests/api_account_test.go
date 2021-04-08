/*
 * John Shields
 * Horton API - Tests
 *
 * Account API Test
 * Tests for Register & Login
 * Registers a mock User and Logins in the user to the mock DB.
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

// Function to register a mock User by sending request to /register endpoint.
func TestRegister(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing Register...")

	t.Run("register", func(t *testing.T) {
		body := &models.InlineObject{
			Username: "test_user",
			Name:     "Test",
			Password: "@Testing14",
		}

		// encode InLineObject
		payloadBuf := new(bytes.Buffer)
		err := json.NewEncoder(payloadBuf).Encode(body)
		if err != nil {
			log.Println("Unable to Encode", err)
		}

		// set up request
		url := "http://localhost:8080/api/v1/register"
		req, err := http.NewRequest("POST", url, payloadBuf)
		if err != nil {
			log.Println(err)
		}
		// do request
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			// TEST FAILED
			t.Error("\n[FAIL] failed to Register User", err)
			t.Fail()
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

// Function to login a mock User by sending request to /login endpoint.
func TestLogin(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing Login...")

	t.Run("login", func(t *testing.T) {
		body := &models.InlineObject{
			Username: "test_user",
			Password: "@Testing14",
		}

		// encode InLineObject
		payloadBuf := new(bytes.Buffer)
		err := json.NewEncoder(payloadBuf).Encode(body)
		if err != nil {
			log.Println("Unable to Encode", err)
		}

		// set up request
		url := "http://localhost:8080/api/v1/login"
		req, err := http.NewRequest("POST", url, payloadBuf)
		if err != nil {
			log.Println(err)
		}

		// do request
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			// TEST FAILED
			t.Error("\n[FAIL] failed to Login User", err)
			t.Fail()
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
