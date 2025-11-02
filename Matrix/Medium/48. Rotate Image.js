// https://leetcode.com/problems/rotate-image/description/

/*

Brute

O(r*c) + O(r*c)

*/



var rotate = function(matrix) {
    const r = matrix.length
    const c = matrix[0].length

    const temp = Array.from({length: r}, () => new Array(c))

    for (let i = 0; i < r; i++) { // assign the value to the new matrix at the correct index
        for (let j = 0; j < c; j++ ) {
            temp[j][r - i - 1] = matrix[i][j]
        }
    }

    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            matrix[i][j] = temp[i][j]
        }
    }
};


/*

Optimal

O(r/2*c/2) & O(1)

*/



var rotate = function (matrix) {
    const r = matrix.length
    const c = matrix[0].length


    for (let i = 0; i < r - 1; i++) { // transpose the matrix
        for (let j = i + 1; j < c; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        }
    }

    for (let i = 0; i < r; i++) { // reverse each row
        reverse(matrix[i], 0, r - 1)
    }
};

const reverse = (row, i, j) => {
    while (i < j) {
        [row[i], row[j]] = [row[j], row[i]]
        i++
        j--
    }
}