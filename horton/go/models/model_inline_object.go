/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * In line Object
 * Model for user details.
 */

package models

type InlineObject struct {
	Username string `json:"username,omitempty"`

	Name string `json:"name,omitempty"`

	Password string `json:"password,omitempty"`
}
