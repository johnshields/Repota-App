/*
 * John Shields
 * Horton
 *
 * Worker Account
 * For new worker in workers table
 *
 */

package models

type WorkerAccount struct {
	Id         int
	Username   string
	WorkerName string
	Password   string
}
