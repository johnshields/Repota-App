/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * Car Database API
 * Connects to a 3rd Party API to retrieve Vehicle Data for users to select/search while creating and editing reports.
 * 3rd Party API - https://www.back4app.com/database/back4app/car-make-model-dataset
 *
 * References
 * https://stackoverflow.com/questions/51452148/how-can-i-make-a-request-with-a-bearer-token-in-go
 * https://www.alexedwards.net/blog/how-to-properly-parse-a-json-request-body
 */

package openapi

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io"
	"io/ioutil"
	"log"
	"net/http"
)

// GetCarApiData
// Function to get Vehicle Data from Back4App (3rd Party API) and send to Client.
// Read in the config files for API access, set up the request, set the auth headers from the config files,
// do the request and then send the data from Back4App to client.
func GetCarApiData(c *gin.Context) {
	// Read in config files.
	id, err := ioutil.ReadFile("go/config/api_id.txt")
	key, err := ioutil.ReadFile("go/config/api_key.txt")
	if err != nil {
		log.Println("Unable to read files", err)
		c.JSON(500, nil)
	}
	// Set text from config files to strings - for setting auth Headers.
	appID := string(id)
	apiKey := string(key)

	// Back4App URL with data of a 1000 Vehicle Makes and Models.
	url := "https://parseapi.back4app.com/classes/Car_Model_List?limit=1000&keys=Make,Model"

	// Set up request with URL.
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Println(err)
		c.JSON(500, nil)
	}
	// Set auth Headers for API access.
	req.Header.Set("X-Parse-Application-Id", appID)
	req.Header.Set("X-Parse-Master-Key", apiKey)

	// Check for user's cookie - if they do not have one abort the request.
	// Status code handled by CheckForCookie.
	if !CheckForCookie(c) {
		log.Println("User is unauthorized")
		return
	}

	// Do GET request - get data from Back4App.
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Unable to do request", err)
		c.JSON(500, nil)
	}

	// Decode JSON from response body.
	var data map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		log.Println("Unable to decode", err)
		c.JSON(500, nil)
	}

	// Send data to client.
	c.JSON(http.StatusOK, data)
	// Close the response body.
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			log.Println("Failed to close body from request.")
		}
	}(resp.Body)
}
