// https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1


/*
O(4^(rows*cols)) & O(rows*cols)

*/

class Solution {
    // Function to find all possible paths
    
    ratInMaze(maze) {
        // code here
        
        const rows = maze.length
        const cols = maze[0].length
        
        let ans = []
        let visited = Array.from({length: rows} , () => new Array(cols).fill(0))
        
        const solve = (row, col, path) => {
            if (row === rows - 1 && col === cols - 1) {
                ans.push(path)
                return
            }
            // we iterate in lexicographical order, Down -> Left -> Right -> Up
            
            // downward
            
            if (row + 1 < rows && !visited[row][col] && maze[row][col] === 1) {
                visited[row][col] = 1
                solve(row + 1, col, path + 'D')
                visited[row][col] = 0
            }
            
            // leftward
            
            if (col - 1 >= 0 && !visited[row][col] && maze[row][col] === 1) {
                visited[row][col] = 1
                solve(row, col - 1, path + 'L')
                visited[row][col] = 0
            }
            
            // rightward
            
            if (col + 1 < cols && !visited[row][col] && maze[row][col] === 1) {
                visited[row][col] = 1
                solve(row, col + 1, path + 'R')
                visited[row][col] = 0
            }
            
            // upward
            
            if (row - 1 >= 0 && !visited[row][col] && maze[row][col] === 1) {
                visited[row][col] = 1
                solve(row - 1, col, path + 'U')
                visited[row][col] = 0
            }
        }
        
        if (maze[0][0] === 1) solve(0, 0, "")
        return ans
    }
}