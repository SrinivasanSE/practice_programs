// https://www.geeksforgeeks.org/greedy-algorithm-to-find-minimum-number-of-coins/

/*

O(amt) & O(1)

*/
// Greedy works here, because if we add two coins, it will not be greater than the next coin. 2 + 5 < 10, but if the coins are like this [1, 5, 6, 9], 5 + 6 > 9 greedy won't work, 
// for val 11, it will be [9, 1, 1] but it should be [5,6]

class Solution {

    minPartition(amt) {
        // code here
        const d = [ 1, 2, 5, 10, 20, 50, 100, 200, 500, 2000 ]
        let res = []
        for(let i = d.length - 1; i >= 0; i--) {
            let c = d[i]
            while (amt >= c) { // keep decreasing the coin val from the amt
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


// If asked to print the count

class Solution {
    findMin(n) {
        // code here
        let noOfCoins = 0
        let coins = [10, 5, 2, 1], i = 0
        let val
        while (n > 0) {
            val = Math.floor(n/coins[i])
            noOfCoins += val
            n -= (val * coins[i])
            i++
        }
        
        return noOfCoins
    }
}