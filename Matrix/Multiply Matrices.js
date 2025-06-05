// https://www.geeksforgeeks.org/c-program-multiply-two-matrices/

class Solution {
    multiply(a, b, n) {
        // code here
        const r1 = a.length
        const c1 = a[0].length
        const r2 = b.length
        const c2 = b[0].length
        
        if (c1 != r2 ) {
            return
        }
        
        const res = Array.from({length: r1}, () => Array(c2).fill(0))
        
        for(let i = 0; i < r1; i++) {
            for(let j = 0; j < c2; j++) {
                for(let k = 0; k < c1; k++) {
                    res[i][j] += a[i][k]*b[k][j]
                }
            }
        }
        let out = ""
        for (const row of res) {
        out += row.join(" ") + " "
    }
        console.log(out)
    }
}