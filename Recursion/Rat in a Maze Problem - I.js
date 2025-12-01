// https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1


/*
O(4^(rows*cols)) & O(rows*cols)

*/

class Solution {
    ratInMaze(maze) {
        // code here
        const n = maze.length
        const visited = Array.from({ length: n }, () => new Array(n).fill(0))
        const res = []

        const findPaths = (row, col, path) => {
            if (row === n - 1 && col === n - 1) {
                res.push(path)
                return
            }
            // lexico DLRU
            // down
            if (row + 1 < n && visited[row + 1][col] != 1 && maze[row + 1][col] === 1) {
                visited[row][col] = 1 // we mark the curr row and col as visited and not row + 1 and col to not revisit this again.
                findPaths(row + 1, col, path + 'D')
                visited[row][col] = 0
            }
            // left
            if (col - 1 >= 0 && visited[row][col - 1] != 1 && maze[row][col - 1] === 1) {
                visited[row][col] = 1
                findPaths(row, col - 1, path + 'L')
                visited[row][col] = 0
            }
            // right
            if (col + 1 < n && visited[row][col + 1] != 1 && maze[row][col + 1] === 1) {
                visited[row][col] = 1
                findPaths(row, col + 1, path + 'R')
                visited[row][col] = 0
            }
            // top
            if (row - 1 >= 0 && visited[row - 1][col] != 1 && maze[row - 1][col] === 1) {
                visited[row][col] = 1
                findPaths(row - 1, col, path + 'U')
                visited[row][col] = 0
            }
        }

        if (maze[0][0] === 1) findPaths(0, 0, "")
        return res
    }
}

// Optimal - using for loop


class Solution {
    ratInMaze(maze) {
        // code here
        const n = maze.length
        const visited = Array.from({ length: n }, () => new Array(n).fill(0))
        const res = []

        const dirRow = [1, 0, 0, -1] //  D L R U. row + 1, row + 0, row + 0, row - 1
        const dirCol = [0, -1, 1, 0] //  D L R U. col + 0, col - 1, col + 1, col + 0
        const dirChar = ['D', 'L', 'R', 'U']

        const findPaths = (row, col, path) => {
            if (row === n - 1 && col === n - 1) {
                res.push(path)
                return
            }

            let newRow, newCol

            for (let d = 0; d < 4; d++) {
                newRow = row + dirRow[d]
                newCol = col + dirCol[d]

                if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && visited[newRow][newCol] != 1 && maze[newRow][newCol] == 1) {
                    visited[row][col] = 1
                    findPaths(newRow, newCol, path + dirChar[d])
                    visited[row][col] = 0
                }
            }


        }

        if (maze[0][0] === 1) findPaths(0, 0, "")
        return res
    }
}