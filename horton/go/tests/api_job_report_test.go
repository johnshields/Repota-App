package tests

import (
	"fmt"
	"github.com/GIT_USER_ID/GIT_REPO_ID/go"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/stretchr/testify/assert"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCreateReport(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args func(t *testing.T) args
	}{
		{
			name: "createReport",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tArgs := tt.args(t)

			openapi.CreateReport(tArgs.c)
		})
	}
}

func TestGetReportById(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("getReportById", func(t *testing.T) {

		handler := openapi.GetReportById
		router := gin.Default()
		router.GET("/api/v1/jobReports/141", handler)

		req, err := http.NewRequest("GET", "http://localhost:8080/api/v1/jobReports/141", nil)
		if err != nil {
			log.Println(err)
		}
		client := &http.Client{}
		_, err = client.Do(req)

		if err != nil {
			// TEST FAILED
			t.Error("\n[FAIL] failed to get reportById", err)
			t.Fail()
		}
		// TEST PASSED
		fmt.Println("\n[PASS] succeeded to get ReportById")
	})
}

func TestGetReports(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("getReports", func(t *testing.T) {

		handler := openapi.GetReports
		router := gin.Default()
		router.GET("/api/v1/jobReports", handler)

		req, err := http.NewRequest("GET", "/api/v1/jobReports", nil)
		if err != nil {
			t.Error("\n[FAIL] ", err)
			t.Fail()
		}
		resp := httptest.NewRecorder()
		router.ServeHTTP(resp, req)
		assert.Equal(t, resp.Code, 200)
	})
}

func TestUpdateReport(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args func(t *testing.T) args
	}{
		{
			name: "updateReport",
		},
	}

		for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tArgs := tt.args(t)

			openapi.UpdateReport(tArgs.c)

		})
	}
}

func TestDeleteReport(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args func(t *testing.T) args
	}{
		{
			name: "DeleteReport",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tArgs := tt.args(t)

			openapi.DeleteReport(tArgs.c)

		})
	}
}
