package mocks

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

// Function to set up a mock db for unit tests.
func MockDbConn() (db *sql.DB) {

	db, err := sql.Open("mysql", "john:local@tcp(127.0.0.1:3306)/repotadb")

	if err != nil {
		panic(err.Error())
	}
	return db
}
