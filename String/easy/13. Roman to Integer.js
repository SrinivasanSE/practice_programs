// https://leetcode.com/problems/roman-to-integer/description/

var romanToInt = function(s) {
    const hashmap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    let sum = 0
    const n = s.length

    for(let i = 0; i < n; i++) {
            if (i < n - 1 && hashmap[s[i]] < hashmap[s[i + 1]] ) { // in roman, if char with less value is at the front, we will subtract it. 
            // For example IV, I is one, V is 5, so we subtract 1 and when V comes, we add 5, so net value will be 4 only
                sum -= hashmap[s[i]]
            } else {
                sum += hashmap[s[i]]
            }
    }

    return sum
};



var romanToInt = function(s) {
    const hashmap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    let sum = 0
    const n = s.length

    for(let i = 0; i < n; i++) {
            if (i < n - 1 && (s[i] === 'I' && (s[i + 1] === 'V' || s[i + 1] === 'X')) || (s[i] === 'X' && (s[i + 1] === 'L' || s[i + 1] === 'C')) || (s[i] === 'C' && (s[i + 1] === 'D' || s[i + 1] === 'M'))) {
                sum += (hashmap[s[i + 1]] - hashmap[s[i]])
                i++
            } else {
                sum += hashmap[s[i]]
            }
        
    }

    return sum
};