package tests

import (
	"github.com/GIT_USER_ID/GIT_REPO_ID/go"
	"reflect"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestCheckForCookie(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args func(t *testing.T) args

		want1 bool
	}{
		{
			name: "checkForCookie",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tArgs := tt.args(t)

			got1 := openapi.CheckForCookie(tArgs.c)

			if !reflect.DeepEqual(got1, tt.want1) {
				t.Errorf("CheckForCookie got1 = %v, want1: %v", got1, tt.want1)
			}
		})
	}
}

func TestLogout(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args func(t *testing.T) args
	}{
		{
			name: "logout",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tArgs := tt.args(t)

			openapi.Logout(tArgs.c)

		})
	}
}
