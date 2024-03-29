package ai

type Point struct {
	y, x int
}

type Board struct {
	origin     uint8
	grid       [FRONTIER_BOARD_SIZE]uint8
	saturation uint8 // How much of the board is filled up
}

func (board *Board) agentPerformanceEvaluation(piece uint8) int {
	var segmentInstances [6]int
	performance := 0

	// Horizontal
	for y := uint8(0); y < FRONTIER_BOARD_DIMENSION; y++ {
		len := 0

		for x := uint8(0); x < FRONTIER_BOARD_DIMENSION; x++ {
			if board.grid[y*FRONTIER_BOARD_DIMENSION+x] == piece {
				len++
			} else {
				segmentInstances[len]++
				len = 0
			}
		}

		segmentInstances[len]++
	}

	// Vertical
	for y := uint8(0); y < FRONTIER_BOARD_DIMENSION; y++ {
		len := 0

		for x := uint8(0); x < FRONTIER_BOARD_DIMENSION; x++ {
			if board.grid[x*FRONTIER_BOARD_DIMENSION+y] == piece {
				len++
			} else {
				segmentInstances[len]++
				len = 0
			}
		}

		segmentInstances[len]++
	}

	// Positive Slope
	for _, point := range POS_DIAGONAL_POINTS {
		len := 0

		for y, x := point.y, point.x; y >= point.x; {
			if board.grid[y*int(FRONTIER_BOARD_DIMENSION)+x] == piece {
				len++
			} else {
				segmentInstances[len]++
				len = 0
			}
			y--
			x++
		}

		segmentInstances[len]++
	}

	// Negative Slope
	for _, point := range NEG_DIAGONAL_POINTS {
		len := 0

		for y, x := point.y, point.x; y >= 0 && x >= 0; {
			if board.grid[y*int(FRONTIER_BOARD_DIMENSION)+x] == piece {
				len++
			} else {
				segmentInstances[len]++
				len = 0
			}
			y--
			x--
		}

		segmentInstances[len]++
	}

	// Evaluate Board State
	for segmentLength := 1; segmentLength <= 5; segmentLength++ {
		performance += SEGMENT_VALUE[segmentLength] * segmentInstances[segmentLength]
	}

	return performance
}

func (board *Board) staticEvaluation() int {
	return board.agentPerformanceEvaluation(WHITE) - board.agentPerformanceEvaluation(BLACK)
}
