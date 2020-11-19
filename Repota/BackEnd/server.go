// golang server
// mysql database
//https://levelup.gitconnected.com/build-a-rest-api-using-go-mysql-gorm-and-mux-a02e9a2865ee

package main

import (
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	_ "github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"log"
	"net/http"
)
var db *gorm.DB
var err error

// table data
type Automobiles struct{
	Id    int    `json:"id"`
	Brand string `json:"brand"`
	Model string  `json:"model"`
}

// request handler
func handleRequests() {
	log.Println("Server started on: http://localhost:8080")
	log.Println("Server started on: http://52.51.6.178:8080")
	log.Println("Quit the server with CONTROL-C.")
	// creates a new instance of a mux router
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/automobiles", returnAllAutomobiles)
	log.Fatal(http.ListenAndServe(":8080", myRouter))
}

// home page for Repota
func homePage(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Welcome to Repota!")
	fmt.Println("Endpoint Hit: HomePage")
}

// display automobiles table
func returnAllAutomobiles(w http.ResponseWriter, r *http.Request) {
	var automobiles []Automobiles
	db.Find(&automobiles)
	fmt.Println("Endpoint Hit: returnAllAutomobiles")
	json.NewEncoder(w).Encode(automobiles)
}

func main() {
	// connect to mysql database
	fmt.Println("Go connect to MySQL")
	db, err = gorm.Open("mysql", "root:@tcp(127.0.0.1:3306)/repotadb")
	//db, err = gorm.Open("mysql", "john:root@tcp(127.0.0.1:3306)/repotadb")

	if err!=nil{
		log.Println("Database connection Failed to Open")
	}else{
		log.Println("Database connection Established")
	}

	db.AutoMigrate(&Automobiles{})
	// calls requests to be made
	handleRequests()
	defer db.Close()
}
