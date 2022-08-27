package ai

type Point struct {
	y, x uint8
}

type Board struct {
	origin     Point
	grid       [BOARDSIZE]uint8
	saturation uint8 // How much of the board is filled up
}

func (board *Board) agentPerformanceEvaluation(piece uint8) (performance int) {
	// Handle Game Draw
	if board.saturation == BOARDSIZE {
		return 0
	}

	var segmentInstances [6]int

	// Horizontal
	for i := uint8(0); i < DIMENSION; i++ {
		len := 0

		for j := uint8(0); j < DIMENSION; j++ {
			if board.grid[i*BOARDSIZE+j] == piece {
				len++
			} else {
				segmentInstances[len]++
				len = 0
			}
		}

		segmentInstances[len]++
	}

	// Vertical
	for i := uint8(0); i < DIMENSION; i++ {
		len := 0

		for j := uint8(0); j < DIMENSION; j++ {
			if board.grid[j*BOARDSIZE+i] == piece {
				len++
			} else {
				segmentInstances[len]++
				len = 0
			}
		}

		segmentInstances[len]++
	}

	// Positive Slope

	// Negative Slope

	// Evaluate Board State

	// Handle Game Over

	return
}

func (board *Board) staticEvaluation() int {
	return board.agentPerformanceEvaluation(WHITE) - board.agentPerformanceEvaluation(BLACK)
}

func (board *Board) get(i, j uint8) uint8 {
	return board.grid[(board.origin.y+i)*BOARDSIZE+(board.origin.x+j)]
}

func (board *Board) set(i, j, piece uint8) {
	board.grid[i*BOARDSIZE+j] = piece
	board.saturation++
	board.staticEvaluation()
}
