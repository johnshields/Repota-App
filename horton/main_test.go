package main

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
		main()

		// See if main ran the router by getting API endpoint.
		req, err := http.NewRequest("GET", "http://localhost:8080/api/v1", nil)
		if err != nil {
			log.Println(err)
		}

		client := &http.Client{}
		_, err = client.Do(req)

		if err != nil {
			// TEST FAILED
			t.Error("\n[FAIL] Main failed to run router", err)
			t.Fail()
		}
		// TEST PASSED
		fmt.Println("\n[PASS] Main ran and started the router")
	})
}
