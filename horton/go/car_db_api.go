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

	// set up request from URL.
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Println(err)
		c.JSON(500, nil)
	}
	// set auth Headers for API access.
	req.Header.Set("X-Parse-Application-Id", appID)
	req.Header.Set("X-Parse-Master-Key", apiKey)

	// send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("[ALERT] Unable to do request", err)
		c.JSON(500, nil)
	}

	// decode JSON from response body.
	var data map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		log.Println("[ALERT] Unable to decode", err)
		c.JSON(500, nil)
	}

	// Send data to client.
	c.JSON(http.StatusOK, data)
	defer resp.Body.Close()
}
