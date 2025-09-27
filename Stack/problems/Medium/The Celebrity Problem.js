// https://www.geeksforgeeks.org/the-celebrity-problem/

// At max, there can be only once celebrity because celebrity can't know anyone and everyone else should know the celebrity 

/*

Brute
O(n^2) & O(n)
*/

class Solution {
    celebrity(mat) {
        // your code here
        const n = mat.length
        let knowMe = new Array(n).fill(0)
        let iKnow = new Array(n).fill(0)
        
        for(let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] === 1 && i != j) {
                    iKnow[i]++ //tracks how many people the current row person knows
                    knowMe[j]++ // tracks how many people know the column j person
                }
            }
        }
        for(let i = 0; i < n; i++) {
            if (iKnow[i] === 0 && knowMe[i] === n - 1) {
                return i
            }
        }
        
        return -1
    }
}

/*

Optimal - Stack
O(n) & O(n)

*/

// using stack
function celebrity(mat) {
    // your code here
    const n = mat.length
    let stk = []
    for(let i = 0; i < n; i++) {
        stk.push(i)
    }
    
    while(stk.length > 1) {
        const a = stk.pop()
        const b = stk.pop()
        
        if(mat[a][b] === 0) {
            stk.push(a)
        } else {
            stk.push(b)
        }
    }
    
    const c = stk.pop()
    for(let i = 0; i < n; i++) {
        if (i === c) {
            continue
        }
        if (mat[i][c] === 0 || mat[c][i] != 0) {
            return -1
        }
    }
    
    return c
}


/*
Better - Two pointers

O(n) & O(1)

*/

// Two pointers
function celebrity(mat) {
    // your code here
    const n = mat.length
    let top = 0, down = n - 1
    
    while(top < down) {
        
        if(mat[top][down] === 1) { // if top knows down, top can't be the celebrity, 
            top++
        } else if (mat[down][top] === 1) {
            down--
        } else { // if both of them are 0, both can't be the celebrity
            top++
            down--
        }
    }

    if (top > down) return -1

    
    const c = top // down can also be used
    for(let i = 0; i < n; i++) {
        if (i === c) { // at diagonal, it will always be 0
            continue
        }
        if (mat[i][c] === 0 || mat[c][i] === 1) {
            return -1
        }
    }
    
    return c
}



