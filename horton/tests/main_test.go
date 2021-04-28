/*
 * John Shields
 * Horton API - Tests
 *
 * Main Test
 * Tests Main to see if the router was launched.
 */

package tests

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"testing"
)

func Test_main(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("launchRouter", func(t *testing.T) {
		fmt.Println("[TEST] Testing Main...")
		// See if main ran the router by getting API endpoint.
		req, err := http.NewRequest("GET", "http://localhost:8080/api/v1/", nil)
		if err != nil {
			log.Println(err)
		}

		// Do GET request (See if Horton is up and running).
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "200 OK" {
			// TEST PASSED
			fmt.Println("\n[PASS] Main ran and started the router")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] Main failed to run router", err)
			t.Fail()
		}
	})
}
