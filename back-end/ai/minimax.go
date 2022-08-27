package ai

func miniMax(board Board, alpha, beta int, turn, depth, maxDepth uint8) int {
	if depth == maxDepth || board.saturation == BOARDSIZE {
		return board.staticEvaluation()
	}

	depth++

	if turn == WHITE { // This is Maximizing Player (AI -> WHITE)
		if board.staticEvaluation() == EXTREME_VALUE { // AI Wins!
			return EXTREME_VALUE
		}

		bestScore := -EXTREME_VALUE

		for index, piece := range board.grid {
			if piece == EMPTY {
				board.grid[index] = WHITE
				board.saturation++

				score := miniMax(board, alpha, beta, BLACK, depth, getMaxDepth(board.saturation))

				if score > bestScore {
					bestScore = score
				}

				if bestScore > alpha {
					alpha = bestScore
				}

				if alpha > beta {
					break
				}

				board.grid[index] = EMPTY
				board.saturation--
			}
		}
		return bestScore

	} else { // This is Minimizing Player (Human -> BLACK)
		if board.staticEvaluation() == EXTREME_VALUE {
			return -EXTREME_VALUE
		}

		bestScore := EXTREME_VALUE

		for index, piece := range board.grid {
			if piece == EMPTY {
				board.grid[index] = BLACK
				board.saturation++

				score := miniMax(board, alpha, beta, WHITE, depth, getMaxDepth(board.saturation))

				if score < bestScore {
					bestScore = score
				}

				if bestScore < beta {
					beta = bestScore
				}

				if alpha > beta {
					break
				}

				board.grid[index] = EMPTY
				board.saturation--
			}
		}
		return bestScore
	}
}
