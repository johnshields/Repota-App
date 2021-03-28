/*
 * John Shields
 * Horton - Mocks
 *
 * Mock DB Connection
 * Logs into Mock MySQL DB for unit tests.
 */

package mocks

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

// Function to set up a mock db.
func MockDbConn() (db *sql.DB) {
	db, err := sql.Open("mysql", "john:local@tcp(127.0.0.1:3306)/repotadb")

	if err != nil {
		panic(err.Error())
	}
	return db
}
