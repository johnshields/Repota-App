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

// MockDbConn to set up a Mock Database for testing.
func MockDbConn() (db *sql.DB) {
	db, err := sql.Open("mysql", "mock_user:mock@tcp(127.0.0.1:3306)/mock_repotadb")

	if err != nil {
		panic(err.Error())
	}
	return db
}
