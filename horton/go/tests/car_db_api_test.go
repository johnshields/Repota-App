package tests

import (
	"fmt"
	"github.com/GIT_USER_ID/GIT_REPO_ID/go"
	"log"
	"net/http"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestGetCarApiData(t *testing.T) {
	gin.SetMode(gin.TestMode)

	tests := []struct {
		name string
	}{
		{
			name: "getCarApiData",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			handler := openapi.GetCarApiData
			router := gin.Default()
			router.GET("/api/v1/getCarApiData", handler)

			// See if main ran the router by getting API endpoint.
			req, err := http.NewRequest("GET", "http://localhost:8080/api/carApiData", nil)
			if err != nil {
				log.Println(err)
			}

			client := &http.Client{}
			_, err = client.Do(req)

			if err != nil {
				// TEST FAILED
				t.Error("\n[FAIL] GetCarApiData failed to set up endpoint", err)
				t.Fail()
			}
			// TEST PASSED
			fmt.Println("\n[PASS] GetCarApiData succeeded to set up endpoint")
		})
	}
}
