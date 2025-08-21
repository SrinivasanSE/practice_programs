// https://leetcode.com/problems/pascals-triangle/description/
// https://takeuforward.org/data-structure/program-to-generate-pascals-triangle/


/*

Brute Force
O(n^2) & O(n^2)
*/

var generate = function(numRows) {
    
    const mat = []

    for(let row = 0; row < numRows; row++) {
        let ans = []
        for(let col = 0; col <= row; col++ ) {
            if (col === 0 || col === row) {
                ans.push(1)
            } else {

            ans.push(mat[row - 1][col - 1] + mat[row - 1][col])
            }
        }
        mat.push(ans)
    }
    return mat

};


/*

Optimal
O(n^2) & O(1)
*/


const generateRow = (row) => {
    let ansRow = [1]
    let res = 1
    for(let i = 1; i < row; i++) {
        res = res * (row - i)
        res = res / i
        ansRow.push(res)
    }

    return ansRow

}
var generate = function(numRows) {
    
    const ans = []
    for(let i = 1; i <= numRows; i++) {
        ans.push(generateRow(i))
    }

    return ans

};

// to get an element at a particular position

function nCr(n, r) {
    let res = 1;

    // calculating nCr:
    for (let i = 0; i < r; i++) {
        res = res * (n - i);
        res = res / (i + 1);
    }
    return res;
    }

    function pascalTriangle(r, c) {
    const element = nCr(r - 1, c - 1);
    return element;
}

const r = 5; // row number
const c = 3; // col number
const element = pascalTriangle(r, c);
console.log(`The element at position (${r},${c}) is: ${element}`);