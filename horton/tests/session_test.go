/*
 * John Shields
 * Horton API - Tests
 *
 * Session Test
 * Test for Logout of mock User created in API Account Test.
 */

package tests

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"testing"
)

// Function to test Logout by sending request to /logout endpoint.
func TestLogout(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing Logout...")

	t.Run("logout", func(t *testing.T) {
		// set up request
		url := "http://localhost:8080/api/v1/logout"
		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			log.Println(err)
		}
		// do request
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			t.Error("\n[FAIL] failed to logout User", err)
			t.Fail()
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
