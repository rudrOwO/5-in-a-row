package ai

type Board struct {
	grid       [BOARDSIZE]int8
	value      int16 // Computer First -> Positive for favourable condition
	saturation int8  // How much of the board is filled up
}
