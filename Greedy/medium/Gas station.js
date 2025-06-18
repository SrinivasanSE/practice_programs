// https://www.geeksforgeeks.org/dsa/find-a-tour-that-visits-all-stations/

class Solution {
    startStation(gas, cost) {
        // Your code here
        
        
        const n = gas.length
        
        
        let startIndex = 0
        let tank = 0
        let total = 0
        for(let i = 0; i < n; i++) {
            tank += gas[i] - cost[i]
            total += gas[i] - cost[i]
            if (tank < 0) {
                tank = 0
                startIndex = i + 1
            }
        }
        
        if (total < 0) {
            return -1
        }
        
        return startIndex
        
    }
}

// JavaScript program to find starting index of circular Tour
// by considering each index as starting point.

function startStation(gas, cost) {
    let n = gas.length;
    let startIdx = -1;
    
    for (let i = 0; i < n; i++) {
        
        // Current Available gas
        let currGas = 0;
        let flag = true;
        
        for (let j = 0; j < n; j++) {
            
            // Circular Index
            let idx = (i + j) % n;
            currGas += gas[idx] - cost[idx];
            
            // If Available gas is less than zero, then it isn't
            // possible to proceed further with this starting point
            if (currGas < 0) {
                flag = false;
                break;
            }
        }
        
        // If flag is true, then we have found
      	// the valid starting point
        if (flag) {
            startIdx = i;
            break;
        }
    }
    
    return startIdx;
}
