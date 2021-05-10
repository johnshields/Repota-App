/*
 * John Shields
 * Horton API - Tests
 *
 * GetCarApiData Test
 */

package tests

import (
	"fmt"
	"log"
	"net/http"
	"testing"

	"github.com/gin-gonic/gin"
)

// Function to test GetCarApiData to see if the data from the 3rd Party API is available.
func TestGetCarApiData(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("getCarApiData", func(t *testing.T) {
		fmt.Println("[TEST] Testing GetCarApiData...")
		// Set up request for /carApiData endpoint.
		url := "http://localhost:8080/api/v1/carApiData"
		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			log.Println(err)
		}

		// Do GET request (Get Car API Data).
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "200 OK" {
			// TEST PASSED
			fmt.Println("\n[PASS] GetCarApiData succeeded to set up endpoint")
		} else if res.Status == "403 Forbidden" {
			fmt.Println("[PASS] But User is unauthorized - no cookie")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] GetCarApiData failed to set up endpoint", err)
			t.Fail()
		}

	})
}
