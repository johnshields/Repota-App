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
// Tests the functions CreateReport, CheckForCookie & insertJobReport.
// Passes if the Report was successfully created from the user input.
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

		// Encode JobReport.
		payloadBuf := new(bytes.Buffer)
		err := json.NewEncoder(payloadBuf).Encode(body)
		if err != nil {
			log.Println("Unable to Encode", err)
		}

		// Set up /jobReports request
		url := "http://localhost:8080/api/v1/jobReports"
		req, err := http.NewRequest("POST", url, payloadBuf)
		if err != nil {
			log.Println(err)
		}
		// Do POST request (Create Report).
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			log.Println(err) // Error could happen if theres no internet connection.
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "201 Created" {
			// TEST PASSED
			fmt.Println("\n[PASS] Report was created successfully")
		} else if res.Status == "403 Forbidden" {
			fmt.Println("[PASS] But User is unauthorized to create a report")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to create Report", err)
			t.Fail()
		}
	})
}

// Function to test GetReportById by sending request to /jobReports/ID endpoint.
// Tests the Functions - GetReportById, CheckForCookie & isValidAccount.
// Passes if the requested report is send to the client for the user.
func TestGetReportById(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing GetReportById...")

	t.Run("getReportById", func(t *testing.T) {
		// Set up /jobReports/ID request.
		req, err := http.NewRequest("GET", "http://localhost:8080/api/v1/jobReports/656", nil)
		if err != nil {
			log.Println(err)
		}
		// Do GET request (Get Report by ID).
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
		}
		defer res.Body.Close()

		if res.Status == "200 OK" {
			// TEST PASSED
			fmt.Println("\n[PASS] succeeded to GetReportById")
		} else if res.Status == "403 Forbidden" {
			fmt.Println("[PASS] But User is unauthorized to get this Report")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to GetReportById", err)
			t.Fail()
		}
	})
}

// Function to test GetReports by sending request to /jobReports endpoint.
// Tests the Functions - GetReports, CheckForCookie & isValidAccount.
// Passes if the requested reports is send to the client for the user.
func TestGetReports(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing GetReports...")

	t.Run("getReports", func(t *testing.T) {
		// Set up /jobReports request.
		url := "http://localhost:8080/api/v1/jobReports"
		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			log.Println(err)
		}
		// Do GET request (Get Reports).
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "200 OK" {
			// TEST PASSED
			fmt.Println("\n[PASS] succeeded to GetReports")
		} else if res.Status == "403 Forbidden" {
			fmt.Println("[PASS] But User is unauthorized to get these Reports")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to GetReports", err)
			t.Fail()
		}
	})
}

// Function to test UpdateReport by sending request to /jobReports/ID endpoint.
// Tests the functions UpdateReport & CheckForCookie.
// Passes if the requested Report was successfully updated from the user input.
func TestUpdateReport(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing UpdateReport...")

	t.Run("updateReport", func(t *testing.T) {
		// Set up JobReport Payload.
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

		// Encode JobReport.
		payloadBuf := new(bytes.Buffer)
		err := json.NewEncoder(payloadBuf).Encode(body)
		if err != nil {
			log.Println("Unable to Encode", err)
		}

		// Set up /jobReports/ID request.
		url := "http://localhost:8080/api/v1/jobReports/656"
		req, err := http.NewRequest("PUT", url, payloadBuf)
		if err != nil {
			log.Println(err)
		}
		// Do PUT request (Update Report).
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "202 Accepted" {
			// TEST PASSED
			fmt.Println("\n[PASS] Report was updated successfully")
		} else if res.Status == "403 Forbidden" {
			fmt.Println("[PASS] But User is unauthorized to update this Report")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to updated Report", err)
			t.Fail()
		}
	})
}

// Function to test DeleteReport by sending request to /jobReports/ID endpoint.
// Tests the Functions DeleteReport & CheckForCookie.
// Passes if the requested Report was successfully deleted.
func TestDeleteReport(t *testing.T) {
	gin.SetMode(gin.TestMode)
	fmt.Println("[TEST] Testing DeleteReport...")

	t.Run("deleteReport", func(t *testing.T) {
		// Set up /jobReports/ID request.
		url := "http://localhost:8080/api/v1/jobReports/656"
		req, err := http.NewRequest("DELETE", url, nil)
		if err != nil {
			log.Println(err)
		}
		// Do DELETE request (Delete Report).
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
		}
		defer res.Body.Close()

		fmt.Println("response Status:", res.Status)
		if res.Status == "204 No Content" {
			// TEST PASSED
			fmt.Println("\n[PASS] Report was delete successfully")
		} else if res.Status == "403 Forbidden" {
			fmt.Println("[PASS] User is unauthorized to delete this Report")
		} else {
			// TEST FAILED
			t.Error("\n[FAIL] failed to delete Report", err)
			t.Fail()
		}

	})
}
