package config

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

func DbConn() (db *sql.DB) {
	//db, err := sql.Open("mysql", "john:root@tcp(127.0.0.1:3306)/repotadb") // server
	db, err := sql.Open("mysql", "john:local@tcp(127.0.0.1:3306)/repotadb") // local

	if err != nil {
		panic(err.Error())
	}
	return db
}

