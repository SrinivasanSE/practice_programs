// https://leetcode.com/problems/sudoku-solver/description/


const isValid = (board, row, col, char) => {
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 9; i++) {

        if (board[row][i] === char) return false
        if (board[i][col] === char) return false

        let r = startRow + Math.floor(i / 3);
        let c = startCol + (i % 3);
        if (board[r][c] === char) return false;
    }
    return true
}
const solve = (board) => {
    const rows = board.length
    const cols = board[0].length

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === '.') {

                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, i, j, String(num))) {
                        board[i][j] = String(num)

                        if (solve(board)) return true
                        else board[i][j] = '.'
                    }
                }
                return false
            }
        }
    }
    return true
}

var solveSudoku = function (board) {
    solve(board)
};