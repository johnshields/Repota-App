package tests

import (
	"fmt"
	"log"
	"net/http"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestGetCarApiData(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("getCarApiData", func(t *testing.T) {
		fmt.Println("[TEST] Testing GetCarApiData...")
		// See if main ran the router by getting API endpoint.
		req, err := http.NewRequest("GET", "http://localhost:8080/api/v1/carApiData", nil)
		if err != nil {
			log.Println(err)
		}

		// do request
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			// TEST FAILED
			t.Error("\n[FAIL] GetCarApiData failed to set up endpoint", err)
			t.Fail()
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "200 OK" {
			// TEST PASSED
			fmt.Println("\n[PASS] GetCarApiData succeeded to set up endpoint")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] GetCarApiData failed to set up endpoint", err)
			t.Fail()
		}
	})
}
