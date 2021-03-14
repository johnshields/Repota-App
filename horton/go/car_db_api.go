/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * Car Database API
 * Connects to a 3rd Party API to retrieve Vehicle Data for users to select while creating reports.
 * 3rd Party API - https://www.back4app.com/database/back4app/car-make-model-dataset
 *
 * References
 * https://www.alexedwards.net/blog/how-to-properly-parse-a-json-request-body
 */

package openapi

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
)

// Function to get Vehicle data from 3rd Party API and send to Client.
func GetCarApiData(c *gin.Context) {

	// read config files.
	id, err := ioutil.ReadFile("go/config/api_id.txt")
	key, err := ioutil.ReadFile("go/config/api_key.txt")
	if err != nil {
		log.Println("Unable to read files", err)
	}
	// set text from config files.
	appID := string(id)
	apiKey := string(key)

	// 3rd party API URL
	url := "https://parseapi.back4app.com/classes/Car_Model_List?limit=1000&keys=Make,Model"

	// set up response from URL.
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Println("URL is incorrect", err)
	}
	// set auth Headers.
	req.Header.Set("X-Parse-Application-Id", appID)
	req.Header.Set("X-Parse-Master-Key", apiKey)

	// send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Unable to do request", err)
	}

	// decode JSON from response body.
	var data map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		log.Println("Unable to decode", err)
		c.JSON(http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusOK, data)
}
