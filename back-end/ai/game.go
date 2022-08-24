package ai

import (
	"fmt"
)

/*
	TODO board
	TODO static eval
	TODO Utility
	? Concurrency
	? Caching
*/

// * GLOBAL STUFF
var GAMEOVER bool = false

const (
	BOARDSIZE int8 = 25
	EMPTY     int8 = 0
	WHITE     int8 = 1
	BLACK     int8 = 2
)

func getMaxDepth(saturation int8) int8 {
	if saturation > 16 {
		return 4
	}

	if saturation > 8 {
		return 5
	}

	return BOARDSIZE
}

func Init() {
	fmt.Print(GAMEOVER, "\n")
}
