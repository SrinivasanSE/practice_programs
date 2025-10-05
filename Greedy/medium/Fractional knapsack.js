// https://www.geeksforgeeks.org/fractional-knapsack-problem/

/*

Greedy - Sorting
O(nlogn) * O(n)

*/

class Solution {
    fractionalknapsack(val, wt, capacity) {
        // code here
        const n = val.length
        const items = []
        
        for (let i = 0; i < n; i++) {
            items.push({val: val[i], wt: wt[i]})
        }
        
        items.sort((a, b) => (b.val/b.wt) - (a.val/a.wt)) // sort by val/weight to add the things with high val/unit first
        let total = 0
        for(let i = 0; i < n; i++) {
            if (items[i].wt <= capacity) {
                total += items[i].val
                capacity -= items[i].wt
            } else {
                total += (items[i].val/items[i].wt)*capacity  // calculate the value per unit and multiply with the remaining capacity
                break // break since the capacity will become 0
            }
        }
        
        return total
    }
}