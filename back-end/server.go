package main

import (
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"

	"gomoku/ai"
)

type Request struct {
	Grid [100]uint8 `json:"grid"`
}

func main() {
	r := gin.Default()
	r.Use(cors.Default()) // Allow all origins

	r.POST("/", func(c *gin.Context) {
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
