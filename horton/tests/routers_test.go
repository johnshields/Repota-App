/*
 * John Shields
 * Horton API - Tests
 *
 * Routers Test
 * Test for Index (routes setup).
 */

package tests

import (
	"fmt"
	_ "fmt"
	"log"
	"net/http"
	"testing"

	"github.com/gin-gonic/gin"
)

// Function to test the IndexController by sending a request to /api/v1/ endpoint.
func TestIndex(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("indexController", func(t *testing.T) {
		fmt.Println("[TEST] Testing IndexController...")
		// set up request
		url := "http://localhost:8080/api/v1/"
		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			log.Println(err)
		}
		// do request
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			t.Error("\n[FAIL] failed to setup routes", err)
			t.Fail()
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "200 OK" {
			// TEST PASSED
			fmt.Println("\n[PASS] succeeded to setup routes")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to setup routes", err)
			t.Fail()
		}
	})
}
