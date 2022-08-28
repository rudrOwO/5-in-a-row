package ai

import (
	"math"
)

/*
	* UI
	* board
	* static eval
	* minimax + pruning
	* Utility of move
	* Concurrency
	? Move Ordering
	? Caching
*/

type Response struct {
	AIMove     uint8 `json:"AIMove"`
	IsGameOver bool  `json:"isGameOver"`
	utility    int
}

// * GLOBAL STUFF
const (
	DIMENSION     uint8 = 5
	BOARDSIZE     uint8 = DIMENSION * DIMENSION
	EMPTY         uint8 = 0
	WHITE         uint8 = 1 // AI
	BLACK         uint8 = 2 // Human
	EXTREME_VALUE int   = math.MaxInt - 1
	JOBS          int   = 6 * 6
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

func dispatchJob(boards <-chan Board, possibleResponses chan<- Response) {
	for board := range boards {
		if board.saturation == 0 {
			possibleResponses <- Response{0, GAMEOVER, -1}
		} else {

			AIScore, AIMove := -EXTREME_VALUE, 0

			for index, piece := range board.grid {
				if piece == EMPTY {
					board.grid[index] = WHITE
					board.saturation++

					score := miniMax(board, -EXTREME_VALUE, EXTREME_VALUE, BLACK, 1, getMaxDepth(board.saturation))

					if score > AIScore {
						AIScore = score
						AIMove = index
					}

					board.grid[index] = EMPTY
					board.saturation--
				}
			}

			humanScore := miniMax(board, -EXTREME_VALUE, EXTREME_VALUE, BLACK, 1, getMaxDepth(board.saturation))

			possibleResponses <- Response{
				AIMove:     uint8(AIMove),
				IsGameOver: GAMEOVER,
				utility:    AIScore - humanScore,
			}
		}
	}
}

func GenerateResponse(clientBoard [100]uint8) Response {
	boardsChannel := make(chan Board, JOBS)
	possibleResponses := make(chan Response, JOBS)

	// Dispatching Jobs
	for i := 0; i < JOBS; i++ {
		go dispatchJob(boardsChannel, possibleResponses)
	}

	// Creating 36 boards from the 10x10 board (from client)
	for i := uint8(0); i <= 5; i++ {
		for j := uint8(0); j <= 5; j++ {
			newBoard := Board{grid: [BOARDSIZE]uint8{}, saturation: 0}

			for y, k := i, uint8(0); y < i+5; y++ {
				for x := j; x < j+5; x++ {
					if piece := clientBoard[y*BOARDSIZE+x]; piece != EMPTY {
						newBoard.grid[k] = piece
						newBoard.saturation++
					}
					k++
				}
			}

			boardsChannel <- newBoard
		}
	}
	close(boardsChannel)

	highestUtility, bestResponse := -10, Response{0, false, 0}

	for response := range possibleResponses {
		if response.utility > highestUtility {
			highestUtility = response.utility
			bestResponse = response
		}
	}

	return bestResponse
}
