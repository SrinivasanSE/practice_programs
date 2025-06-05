// https://www.geeksforgeeks.org/inplace-rotate-square-matrix-by-90-degrees/

// Refer the sols above

class Solution {
    // Function to rotate matrix anticlockwise by 90 degrees.
    rotateby90(mat) {
        // code here
        const n = mat.length
        
        for(let i = 0; i < n; i++) {
            for(let j = i + 1; j < n; j++) {
                [mat[i][j], mat[j][i]] = [mat[j][i], mat[i][j]]
            }
        }
        
        for(let i = 0; i < n; i++) {
            let s = 0
            let e = n - 1
            
            while (s < e) {
                [mat[s][i], mat[e][i]] = [mat[e][i], mat[s][i]]
                s++
                e--
            }
        }
    }
}