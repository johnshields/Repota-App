/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * Worker Account
 * Model for new worker (user) in workers table.
 */

package models

type WorkerAccount struct {
	Id         int
	Username   string
	WorkerName string
	Password   string
}
