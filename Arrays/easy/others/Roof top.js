// https://www.geeksforgeeks.org/problems/roof-top-1587115621/1?page=1&category=Searching&difficulty=Easy&sortBy=submissions


function maxStep(arr) {
    let res = 0
    let count = 0
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            count += 1
        } else {
            count = 0
        }

        res = Math.max(res, count)
    }
    return res
}
