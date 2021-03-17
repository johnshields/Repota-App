package tests

import (
	_ "fmt"
	"github.com/GIT_USER_ID/GIT_REPO_ID/go"
	"reflect"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestCORS(t *testing.T) {
	tests := []struct {
		name string

		want1 gin.HandlerFunc
	}{
		{
			name: "CORS",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got1 := openapi.CORS()

			if !reflect.DeepEqual(got1, tt.want1) {
				t.Errorf("CORS got1 = %v, want1: %v", got1, tt.want1)
			}
		})
	}
}

func TestNewRouter(t *testing.T) {
	tests := []struct {
		name string

		want1 *gin.Engine
	}{
		{
			name: "newRouter",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got1 := openapi.NewRouter()

			if !reflect.DeepEqual(got1, tt.want1) {
				t.Errorf("NewRouter got1 = %v, want1: %v", got1, tt.want1)
			}
		})
	}
}

func TestIndex(t *testing.T) {
	type args struct {
		c *gin.Context
	}
	tests := []struct {
		name string
		args func(t *testing.T) args
	}{
		{
			name: "index",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tArgs := tt.args(t)

			openapi.Index(tArgs.c)

		})
	}
}
