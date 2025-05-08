// https://www.geeksforgeeks.org/find-the-longest-sequence-of-apples/

function appleSequences(n, m, arr) {
    let start = 0;
    let end = 0;
    let res = 0;
    let oCount = 0;

    while (end < n) {
        if (arr[end] === 'O') {
            oCount += 1;
        }

        while (oCount > m) {
            if (arr[start] === 'O') {
                oCount -= 1;
            }
            start += 1;
        }

        res = Math.max(res, end - start + 1);
        end += 1;
    }

    return res;
}
