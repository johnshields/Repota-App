package config

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"gopkg.in/ini.v1"
	"log"
	"os"
)

// Reference
// https://ini.unknwon.io/docs/intro/getting_started

func DbConn() (db *sql.DB) {
	// Load config
	cfg, err := ini.Load("go/config/config.ini")

	if err != nil {
		log.Println(" [ALERT] Failed to load config file for database.", cfg)
		os.Exit(1) // Failed to start service
	}

	dbName := cfg.Section("database").Key("db_name")
	username := cfg.Section("database").Key("username")
	password := cfg.Section("database").Key("password")

	db, err = sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(52.51.6.178:3306)/%s", username, password, dbName))

	if err != nil {
		panic(err.Error())
	}
	return db
}
