package main

import (
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"

	"gomoku/ai"
)

type Request struct {
	Grid [5]int8 `json:"grid"`
}

func main() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		var grid Request
		ai.Init()

		if err := c.BindJSON(&grid); err != nil {
			fmt.Print(err)
			return
		}

		for i := range grid.Grid {
			grid.Grid[i] += 1
		}

		c.JSON(http.StatusOK, grid)
	})

	r.Run("localhost:5000")

}
