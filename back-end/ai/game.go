package ai

import (
	"math"
)

/*
	* UI
	* board
	TODO static eval
	* minimax + pruning
	TODO Utility of move
	TODO Concurrency
	? Move Ordering
	? Caching
*/

// * GLOBAL STUFF
var GAMEOVER = false
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
	if saturation < 9 { // 1 ~ 8 slots occupied
		return 4
	}
	if saturation < 16 { // 9 ~ 15 slots occupied
		return 5
	}

	return BOARDSIZE // 16 ~ 25 slots occupied
}

func Init() {
}
