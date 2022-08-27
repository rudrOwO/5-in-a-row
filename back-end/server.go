package main

import (
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"

	"gomoku/ai"
)

type Request struct {
	Grid [5]uint8 `json:"grid"`
}

type Response struct {
	AIMove     uint8 `json:"AIMove"`
	IsGameOver bool  `json:"isGameOver"`
}

func main() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		var grid Request
		ai.Init()
		response := Response{0, ai.GAMEOVER}

		if err := c.BindJSON(&grid); err != nil {
			fmt.Print(err)
			return
		}

		c.JSON(http.StatusOK, response)
	})

	r.Run("localhost:5000")

}
