// https://www.geeksforgeeks.org/dsa/find-a-tour-that-visits-all-stations/

/*

Better

O(2n) & O(1)

*/

function startStation(gas, cost) {
    let n = gas.length;
    let startIdx = 0;

    // Initially tank is empty
    let currGas = 0;

    for (let i = 0; i < n; i++) { // find the starting index
        currGas = currGas + gas[i] - cost[i];

        // If currGas becomes less than zero, then
        // It's not possible to proceed with this startIdx
        if (currGas < 0) {
            startIdx = i + 1;
            currGas = 0;
        }
    }

    // Checking if startIdx can be a valid 
    // starting point for the Circular tour
    currGas = 0;
    for (let i = 0; i < n; i++) {

        // Circular Index
        let idx = (i + startIdx) % n; // we simulate starting from starting index and coming to the same point later
        currGas = currGas + gas[idx] - cost[idx];
        if (currGas < 0) // if negative,that means can't reach 
            return -1;
    }

    return startIdx;
}



/*

Optimal

O(n) & O(1)

*/


class Solution {
    startStation(gas, cost) {
        const n = gas.length
        let startIndex = 0, tank = 0, total = 0
        for(let i = 0; i < n; i++) {
            tank += gas[i] - cost[i]
            total += gas[i] - cost[i]
            if (tank < 0) { // if the fuel becomes negative, then it can't be the starting point, so we reset values
                tank = 0
                startIndex = i + 1
            }
        }
        
        if (total < 0) { // if total fuel is negative at the end, that means it's impossible
            return -1
        }
        
        return startIndex
        
    }
}


