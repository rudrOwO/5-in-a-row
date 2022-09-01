package ai

func miniMax(board Board, alpha, beta int, turn, depth, maxDepth uint8) int {
	if depth == maxDepth || board.saturation == FRONTIER_BOARD_SIZE {
		return board.staticEvaluation()
	}

	depth++

	if turn == WHITE { // This is Maximizing Player (AI -> WHITE)
		bestScore := -INFINITY

		for index, piece := range board.grid {
			if piece == EMPTY {
				board.grid[index] = WHITE
				board.saturation++

				score := miniMax(board, alpha, beta, BLACK, depth, maxDepth)

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
		bestScore := INFINITY

		for index, piece := range board.grid {
			if piece == EMPTY {
				board.grid[index] = BLACK
				board.saturation++

				score := miniMax(board, alpha, beta, WHITE, depth, maxDepth)

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
