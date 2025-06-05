// https://www.geeksforgeeks.org/program-to-find-transpose-of-a-matrix/

function transpose(mat) {
    let rows = mat.length;
    let cols = mat[0].length;

    // Create a result matrix for the transpose
    let res = Array.from({ length: cols }, () => new Array(rows));

    // Fill res with transposed values of mat
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            res[j][i] = mat[i][j];
        }
    }
    return res;
}

