package main

import (
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"
)

type Board struct {
	Ara [5]int8 `json:"board"`
}

func main() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		var board Board

		if err := c.BindJSON(&board); err != nil {
			fmt.Print(err)
			return
		}

		for i := range board.Ara {
			board.Ara[i] += 1
		}

		// fmt.Print(board.Ara)

		c.JSON(http.StatusOK, board)
	})

	r.Run("localhost:5000")
}
