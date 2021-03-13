/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * Car Database API
 * Connects to a 3rd Party API to retrieve Vehicle Data for users to select while creating reports.
 * carmakesandmodels.co.uk
 *
 * References
 * https://www.alexedwards.net/blog/how-to-properly-parse-a-json-request-body
 * https://stackoverflow.com/questions/13514184/how-can-i-read-a-whole-file-into-a-string-variable
 */

package openapi

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
)

// Function to get Vehicle data from 3rd Party API and send to Client.
func GetCarApiData(c *gin.Context) {

	// read in config file
	text, err := ioutil.ReadFile("go/config/car_api_config.txt")
	if err != nil {
		log.Println(err)
	}

	// URL with API key from config file
	apiKey := string(text)
	url := "https://www.carmakesandmodels.co.uk/api/?apikey=" + apiKey

	// get response from URL
	resp, err := http.Get(url)
	if err != nil {
		log.Println("URL or API key is incorrect", err)
	}

	// decode JSON Array from response body
	var data []string
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		log.Println("Unable to decode", err)
		c.JSON(http.StatusInternalServerError, err)
	}

	fmt.Print(data)
	c.JSON(http.StatusOK, data)
}
