package ai

import (
	"math"
)

/*
	* UI
	* board
	* static eval
	* minimax + pruning
	TODO Utility of move
	TODO Concurrency
	? Move Ordering
	? Caching
*/

// * GLOBAL STUFF
const (
	DIMENSION     uint8 = 5
	BOARDSIZE     uint8 = DIMENSION * DIMENSION
	EMPTY         uint8 = 0
	WHITE         uint8 = 1 // AI
	BLACK         uint8 = 2 // Human
	EXTREME_VALUE int   = math.MaxInt - 1
)

var (
	GAMEOVER            bool           = false
	SEGMENT_VALUE       [6]int         = [6]int{-1, 1, 2, 6, 100, 1000}
	POS_DIAGONAL_POINTS [2*5 - 3]Point = [2*5 - 3]Point{
		{1, 0},
		{2, 0},
		{3, 0},
		{4, 0},
		{4, 1},
		{4, 2},
		{4, 3},
	}
	NEG_DIAGONAL_POINTS [2*5 - 3]Point = [2*5 - 3]Point{
		{1, 4},
		{2, 4},
		{3, 4},
		{4, 4},
		{4, 1},
		{4, 2},
		{4, 3},
	}
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
