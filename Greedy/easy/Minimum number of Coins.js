// https://www.geeksforgeeks.org/greedy-algorithm-to-find-minimum-number-of-coins/

class Solution {

    minPartition(amt) {
        // code here
        const d = [ 1, 2, 5, 10, 20, 50, 100, 200, 500, 2000 ]
        let res = []
        for(let i = d.length - 1; i >= 0; i--) {
            let c = d[i]
            while (amt >= c) {
                amt-=c
                res.push(c)
            }
            
            if (amt === 0) {
                break
            }
        }
        
        return res
    }
}

class Solution {

    minPartition(amt) {
        // code here
        const d = [ 1, 2, 5, 10, 20, 50, 100, 200, 500, 2000 ]
        let res = []
        for(let i = d.length - 1; i >= 0; i--) {
            let c = d[i]
            if (amt >= c) {
                let cnt = Math.floor(amt/c)
                amt-=(cnt*c)
                while (cnt > 0) {
                    res.push(c)
                    cnt--
                }
            }
            
            if (amt === 0) {
                break
            }
        }
        
        return res
    }
}