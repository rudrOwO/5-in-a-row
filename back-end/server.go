package main

import (
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"

	"gomoku/ai"
)

type Request struct {
	Grid [5]uint8 `json:"grid"` // ! Dummy Request
}

type Response struct {
	AIMove     uint8 `json:"AIMove"`
	IsGameOver bool  `json:"isGameOver"`
}

func main() {
	r := gin.Default()
	ai.Init()

	r.GET("/", func(c *gin.Context) {
		var grid Request
		response := Response{0, ai.GAMEOVER} // ! Dummy Response
		ai.GAMEOVER = false

		if err := c.BindJSON(&grid); err != nil {
			fmt.Print(err)
			return
		}

		c.JSON(http.StatusOK, response)
	})

	r.Run("localhost:5000")

}
