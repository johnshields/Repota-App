// golang server
// mysql database
// https://golang.org/doc/articles/wiki/
// https://godoc.org/github.com/go-sql-driver/mysql
// https://www.golangprograms.com/example-of-golang-crud-using-mysql-from-scratch.html
// https://golangbot.com/connect-create-db-mysql/
// https://medium.com/@hugo.bjarred/mysql-and-golang-ea0d620574d2

package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/gorilla/mux"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to Repota %s!", r.URL.Path[1:])
}

func main() {
	//launch server
	http.HandleFunc("/", handler)
	log.Println("Server started on: http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))

	connDB()
}

func connDB() {
	// connect to mysql
	fmt.Println("Go connect to MySQL")
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/repotadb")

	if err != nil {
		log.Fatal("Unable to connect to repotadb")
	}

	fmt.Println("Connected to repotadb")
	defer db.Close()

	results, err := db.Query("select * from automobiles")
	if err != nil {
		log.Fatal("Unable to fetch table rows")
	}
	for results.Next() {
		var (
			id    int
			brand string
			model string
		)
		err = results.Scan(&id, &brand, &model)
		if err != nil {
			log.Fatal("Unable to parse row")
		}
		fmt.Printf("\n ID: %d, Brand: %s, Model: %d \n", id, brand, model)

	}
}
