// https://www.geeksforgeeks.org/sort-given-matrix/
// https://www.geeksforgeeks.org/sort-the-given-matrix-memory-efficient-approach/

class Solution {
    sortedMatrix(n, v) {
        // code here
        let x = [];

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                x.push(v[i][j]);
            }
        }

        x.sort((a, b) => a - b);
        let k = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                v[i][j] = x[k++];
            }
        }

        return v
    }
}

class Solution {
    sortedMatrix(N, Mat) {
        // code here
        const size = N*N
        
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size - 1; j++) {
                
                if (Mat[Math.floor(j/N)][j % N] > Mat[Math.floor((j + 1)/N)][(j + 1)%N]) {
                    let temp = Mat[Math.floor(j/N)][j % N]
                    Mat[Math.floor(j/N)][j % N] = Mat[Math.floor((j + 1)/N)][(j + 1)%N]
                    Mat[Math.floor((j + 1)/N)][(j + 1)%N] = temp
                }
            }
        }
        
        return Mat
    }
}