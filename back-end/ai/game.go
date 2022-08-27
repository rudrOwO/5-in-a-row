package ai

import (
	"fmt"
	"math"
)

/*
	* UI
	* board
	TODO static eval -> Use Heuristic
	TODO minimax + pruning
	TODO Utility of move -> Human, AI, Net
	? Concurrency
	? Move Ordering
	? Caching
*/

// * GLOBAL STUFF
var GAMESTATE string
var SEGMENT_HEURISTICS [6]int = [6]int{-1, 1, 2, 6, 100, 1000}

const (
	DIMENSION     uint8 = 5
	BOARDSIZE     uint8 = DIMENSION * DIMENSION
	EMPTY         uint8 = 0
	WHITE         uint8 = 1 // AI
	BLACK         uint8 = 2 // Human
	EXTREME_VALUE int   = math.MaxInt - 1
)

func getMaxDepth(saturation uint8) uint8 {
	if saturation > 16 {
		return 4
	}

	if saturation > 9 {
		return 5
	}

	return BOARDSIZE
}

func Init() {
	fmt.Print(GAMESTATE, "\n")
}
