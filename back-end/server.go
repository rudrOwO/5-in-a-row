package main

import (
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"

	"gomoku/ai"
)

type Request struct {
	Grid [100]uint8 `json:"grid"`
}

func main() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		var grid Request

		if err := c.BindJSON(&grid); err != nil {
			fmt.Print(err)
			return
		}

		response := ai.GenerateResponse(grid.Grid)
		ai.GAMEOVER = false

		c.JSON(http.StatusOK, response)
	})

	r.Run("localhost:5000")
}
