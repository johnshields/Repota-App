/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * DB Connection
 * Logs into MySQL with the details in config.ini and uses the Repota Database.
 *
 * Reference
 * https://ini.unknwon.io/docs/intro/getting_started
 */

package config

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"gopkg.in/ini.v1"
	"log"
	"os"
)

// Function to use the config.ini file to log into MySQL for database access.
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

	db, err = sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s", username, password, dbName))

	if err != nil {
		panic(err.Error())
	}
	return db
}
