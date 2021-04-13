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

// DbConn use the config.ini file to log into MySQL for database access.
func DbConn() (db *sql.DB) {
	// Load config file.
	cfg, err := ini.Load("go/config/config.ini")

	if err != nil {
		log.Println("Failed to load config file for database.", cfg)
		os.Exit(1) // Failed to start service
	}

	dbName := cfg.Section("database").Key("db_name")
	username := cfg.Section("database").Key("username")
	ip := cfg.Section("database").Key("ip")
	password := cfg.Section("database").Key("password")

	db, err = sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:3306)/%s", username, password, ip, dbName))

	if err != nil {
		panic(err.Error())
	}
	return db
}
