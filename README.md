## An AI built using the [Minimax Algorithm with Alpha-Beta Pruning](https://www.youtube.com/watch?v=l-hh51ncgDI&ab_channel=SebastianLague)

![](/images/gomoku_peek.gif)

<br>

## Technologies used:

- [React](https://reactjs.org/)
- [Gin Framework (Go)](https://gin-gonic.com/)

## How it works

- I split the 10x10 board into 36 smaller boards- each having dimension 5x5.
- Run min-max algorithm on each of the smaller boards concurrently.
- Compare the scores of each smaller board and choose the board that gives the AI the highest chance of winning.

![Architecture diagram](/images/gomoku_arch.svg)
