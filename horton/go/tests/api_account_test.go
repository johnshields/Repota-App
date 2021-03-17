package tests

import (
	"github.com/GIT_USER_ID/GIT_REPO_ID/go"
	"github.com/gin-gonic/gin"
	"testing"
)

func TestLogin(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args func(t *testing.T) args
	}{
		{
			name: "login",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tArgs := tt.args(t)

			openapi.Login(tArgs.c)

		})
	}
}

func TestRegister(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args func(t *testing.T) args
	}{
		{
			name: "register",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tArgs := tt.args(t)

			openapi.Register(tArgs.c)

		})
	}
}

func Test_registerNewUser(t *testing.T) {
	type args struct {
		c        *gin.Context
		username string
		name     string
		password string
	}
	tests := []struct {
		name string
		args func(t *testing.T) args

		wantErr    bool
		inspectErr func(err error, t *testing.T) //use for more precise error evaluation after test
	}{
		{
			name: "registerNewUser",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tArgs := tt.args(t)

			err := openapi.RegisterNewUser(tArgs.c, tArgs.username, tArgs.name, tArgs.password)

			if (err != nil) != tt.wantErr {
				t.Fatalf("registerNewUser error = %v, wantErr: %t", err, tt.wantErr)
			}

			if tt.inspectErr != nil {
				tt.inspectErr(err, t)
			}
		})
	}
}