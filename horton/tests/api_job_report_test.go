/*
 * John Shields
 * Horton API - Tests
 *
 * Job Report API Test
 * Tests for CreateReport, GetReportById, GetReports, UpdateReport and DeleteReport
 * by using the mock user created in API Account Test.
 */

package tests

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/GIT_USER_ID/GIT_REPO_ID/go/models"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"net/http"
	"testing"
)

// Function to test CreateReport by sending request to /jobReports endpoint.
func TestCreateReport(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing CreateReport...")

	t.Run("createReport", func(t *testing.T) {
		body := &models.JobReport{
			Date:            "06-01-2019",
			VehicleModel:    "Peugeot Spinner",
			VehicleReg:      "191-LA-2049",
			VehicleLocation: "Drogheda, Co. Louth",
			MilesOnVehicle:  1337,
			Warranty:        1,
			Breakdown:       0,
			CustomerName:    "Joe Kendal",
			Complaint:       "Door handle broken.",
			Cause:           "Door lock out of place.",
			Correction:      "Door lock has been fixed.",
			Parts:           "NONE",
			WorkHours:       2,
			JobComplete:     1,
		}

		// encode InLineObject
		payloadBuf := new(bytes.Buffer)
		err := json.NewEncoder(payloadBuf).Encode(body)
		if err != nil {
			log.Println("[ALERT] Unable to Encode", err)
		}

		// set up request
		url := "http://localhost:8080/api/v1/jobReports"
		req, err := http.NewRequest("POST", url, payloadBuf)
		if err != nil {
			log.Println(err)
		}
		// do request
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			// TEST FAILED
			t.Error("\n[FAIL] failed to create Report", err)
			t.Fail()
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "201 Created" {
			// TEST PASSED
			fmt.Println("\n[PASS] Report was created successfully")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to create Report", err)
			t.Fail()
		}
	})
}

// Function to test GetReportById by sending request to /jobReports/ID endpoint.
func TestGetReportById(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing GetReportById...")

	t.Run("getReportById", func(t *testing.T) {
		// set up request
		req, err := http.NewRequest("GET", "http://localhost:8080/api/v1/jobReports/656", nil)
		if err != nil {
			log.Println(err)
		}
		// do request
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			// TEST FAILED
			t.Error("\n[FAIL] failed to GetReportById", err)
			t.Fail()
		}
		defer res.Body.Close()

		if res.Status == "200 OK" {
			// TEST PASSED
			fmt.Println("\n[PASS] succeeded to GetReportById")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to GetReportById", err)
			t.Fail()
		}
	})
}

// Function to test GetReports by sending request to /jobReports endpoint.
func TestGetReports(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing GetReports...")

	t.Run("getReports", func(t *testing.T) {
		// set up request
		url := "http://localhost:8080/api/v1/jobReports"
		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			log.Println(err)
		}
		// do request
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			t.Error("\n[FAIL] failed to GetReports", err)
			t.Fail()
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "200 OK" {
			// TEST PASSED
			fmt.Println("\n[PASS] succeeded to GetReports")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to GetReports", err)
			t.Fail()
		}
	})
}

// Function to test UpdateReport by sending request to /jobReports/ID endpoint.
func TestUpdateReport(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing UpdateReport...")

	t.Run("updateReport", func(t *testing.T) {
		body := &models.JobReport{
			Date:            "06-01-2019",
			VehicleModel:    "Peugeot Spinner",
			VehicleReg:      "191-LA-2049",
			VehicleLocation: "Drogheda, Co. Louth",
			MilesOnVehicle:  1337,
			Warranty:        1,
			Breakdown:       0,
			CustomerName:    "Joe Kendal",
			Complaint:       "Door handle broken.",
			Cause:           "Door lock out of place.",
			Correction:      "Door lock has been fixed.",
			Parts:           "NONE",
			WorkHours:       2,
			JobComplete:     1,
		}

		// encode InLineObject
		payloadBuf := new(bytes.Buffer)
		err := json.NewEncoder(payloadBuf).Encode(body)
		if err != nil {
			log.Println("[ALERT] Unable to Encode", err)
		}

		// set up request
		url := "http://localhost:8080/api/v1/jobReports/656"
		req, err := http.NewRequest("PUT", url, payloadBuf)
		if err != nil {
			log.Println(err)
		}
		// do request
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			// TEST FAILED
			t.Error("\n[FAIL] failed to updated Report", err)
			t.Fail()
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "202 Accepted" {
			// TEST PASSED
			fmt.Println("\n[PASS] Report was updated successfully")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to updated Report", err)
			t.Fail()
		}
	})
}

// Function to test DeleteReport by sending request to /jobReports/ID endpoint.
func TestDeleteReport(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing DeleteReport...")

	t.Run("deleteReport", func(t *testing.T) {
		// set up request
		url := "http://localhost:8080/api/v1/jobReports/656"
		req, err := http.NewRequest("DELETE", url, nil)
		if err != nil {
			log.Println(err)
		}
		// do request
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			// TEST FAILED
			t.Error("\n[FAIL] failed to delete Report", err)
			t.Fail()
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "204 No Content" {
			// TEST PASSED
			fmt.Println("\n[PASS] Report was delete successfully")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to delete Report", err)
			t.Fail()
		}

	})
}
