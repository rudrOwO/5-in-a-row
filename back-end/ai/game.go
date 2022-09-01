package ai

/*
	* UI
	* board
	* static eval
	* minimax + pruning
	* Utility of move
	* Concurrency
	? Caching
	? Move Ordering
*/

type Response struct {
	AIMove     uint8 `json:"AIMove"`
	IsGameOver bool  `json:"isGameOver"`
	utility    int
}

// * GLOBAL STUFF
const (
	MAIN_BOARD_DIMENSION     uint8 = 10
	FRONTIER_BOARD_DIMENSION uint8 = 5
	FRONTIER_BOARD_SIZE      uint8 = FRONTIER_BOARD_DIMENSION * FRONTIER_BOARD_DIMENSION
	EMPTY                    uint8 = 0
	WHITE                    uint8 = 1 // AI
	BLACK                    uint8 = 2 // Human
	INFINITY                 int   = 1e7
	JOBS                     int   = 6 * 6
)

var (
	SEGMENT_VALUE [6]int = [6]int{-1,
		1,   // 1 in a row
		5,   // 2 in a row
		10,  // 3 in a row
		1e3, // 4 in a row
		1e4, // 5 in a row
	}
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

	return FRONTIER_BOARD_SIZE // 16 ~ 25 slots occupied
}

func dispatchJob(boards <-chan Board, possibleResponses chan<- Response) {
	for board := range boards {
		if board.saturation == 0 || board.saturation == FRONTIER_BOARD_SIZE {
			possibleResponses <- Response{0, false, -INFINITY}
		} else {

			AIScore, AIMove, isGameOver := -INFINITY, 0, false

			for index, piece := range board.grid {
				if piece == EMPTY {
					board.grid[index] = WHITE
					board.saturation++

					// Check if Game is Over (By AI)
					if board.agentPerformanceEvaluation(WHITE) >= SEGMENT_VALUE[5] {
						isGameOver = true
					}

					score := miniMax(board, -INFINITY, INFINITY, BLACK, 1, getMaxDepth(board.saturation))

					if score > AIScore {
						AIScore = score
						// * Transform co-ordinates from local board to main board
						AIMove = int(board.origin) + (index/int(FRONTIER_BOARD_DIMENSION))*int(MAIN_BOARD_DIMENSION) + (index % int(FRONTIER_BOARD_DIMENSION))
					}

					board.grid[index] = EMPTY
					board.saturation--
				}
			}

			humanScore := miniMax(board, -INFINITY, INFINITY, BLACK, 1, getMaxDepth(board.saturation))

			possibleResponses <- Response{
				AIMove:     uint8(AIMove),
				IsGameOver: isGameOver,
				utility:    AIScore - humanScore,
			}
		}
	}
}

func GenerateResponse(mainBoard [100]uint8) Response {
	boardsChannel := make(chan Board, JOBS)
	possibleResponses := make(chan Response, JOBS)

	// Dispatching Jobs
	for i := 0; i < JOBS; i++ {
		go dispatchJob(boardsChannel, possibleResponses)
	}

	// Creating 36 boards from the 10x10 board (from client)
	for i := uint8(0); i <= 5; i++ {
		for j := uint8(0); j <= 5; j++ {
			newBoard := Board{origin: i*MAIN_BOARD_DIMENSION + j, grid: [FRONTIER_BOARD_SIZE]uint8{}, saturation: 0}

			for y, k := i, 0; y < i+5; y++ {
				for x := j; x < j+5; x++ {
					if piece := mainBoard[y*MAIN_BOARD_DIMENSION+x]; piece != EMPTY {
						newBoard.grid[k] = piece
						newBoard.saturation++
					}
					k++
				}
			}

			// Check if Game is Over (By Human)
			if newBoard.agentPerformanceEvaluation(BLACK) >= SEGMENT_VALUE[5] {
				return Response{AIMove: 0, IsGameOver: true}
			}

			boardsChannel <- newBoard
		}
	}
	close(boardsChannel)

	highestUtility, bestResponse := -INFINITY, Response{0, false, 0}

	for i := 0; i < JOBS; i++ {
		response := <-possibleResponses

		if response.utility > highestUtility {
			highestUtility = response.utility
			bestResponse = response
		}
	}

	return bestResponse
}
