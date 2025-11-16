// https://www.geeksforgeeks.org/find-the-two-repeating-elements-in-a-given-array/
// has many solutions

twoRepeated(n, arr) {
        let res = []
        // your code here
        for(let i = 0; i < n + 2; i++) {
            const index = Math.abs(arr[i])
            //console.log(index, arr)
            if (arr[index - 1] > 0) {
                arr[index - 1]*=-1
            } else {
                res.push(index)
            }
        }
        
        return res
        
    }
