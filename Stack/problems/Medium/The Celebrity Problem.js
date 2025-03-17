// https://www.geeksforgeeks.org/the-celebrity-problem/

// Two pointers
function celebrity(mat) {
    // your code here
    const n = mat.length
    let i = 0, j = n - 1
    
    while(i < j) {
        
        if(mat[i][j] === 1) {
            i++
        } else {
            j--
        }
    }
    
    const c = j
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