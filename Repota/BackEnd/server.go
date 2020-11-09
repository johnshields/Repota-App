package main

import (
	"database/sql"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type Autos struct {
	Id    int
	brand string
	model string
}

func conDB() (db *sql.DB) {
	dbDriver := "mysql"
	dbUser := "root"
	dbPass := ""
	dbName := "repotadb"
	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
	if err != nil {
		panic(err.Error())
	}
	return db
}

func Index(w http.ResponseWriter, r *http.Request) {
	db := conDB()
	selDB, err := db.Query("show tables")
	if err != nil {
		panic(err.Error())
	}
	auto := Autos{}
	res := []Autos{}
	for selDB.Next() {
		var id int
		var brand, model string
		err = selDB.Scan(&id, &brand, &model)
		if err != nil {
			panic(err.Error())
		}
		auto.Id = id
		auto.brand = brand
		auto.model = model
		res = append(res, auto)
	}
	defer db.Close()
}

func Show(w http.ResponseWriter, r *http.Request) {
	db := conDB()
	nId := r.URL.Query().Get("id")
	selDB, err := db.Query("SELECT * FROM automobiles", nId)
	if err != nil {
		panic(err.Error())
	}
	auto := Autos{}
	for selDB.Next() {
		var id int
		var name, city string
		err = selDB.Scan(&id, &name, &city)
		if err != nil {
			panic(err.Error())
		}
		auto.Id = id
		auto.brand = name
		auto.model = city
	}

	defer db.Close()
}

func main() {
	log.Println("Server started on: http://localhost:8080")
	http.HandleFunc("/", Index)
	http.HandleFunc("/show", Show)
	http.ListenAndServe(":8080", nil)
}
