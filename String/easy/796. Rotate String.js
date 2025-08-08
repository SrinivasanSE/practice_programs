// https://leetcode.com/problems/rotate-string/description/

// learn KMP Algorithm

/*
Brute

O(N^2) & O(1)
*/

function canShift(s, goal) {
    if (s.length !== goal.length) return false;
    for (let i = 0; i < s.length; i++) {
        let shifted = s.slice(i) + s.slice(0, i);
        if (shifted === goal) return true;
    }
    return false;
}


/*
Better
O(N) & O(N)

*/

var rotateString = function(s, goal) {
    if (s === goal) return true
    
    if (s.length != goal.length) return false

    return (s + s).includes(goal)

};

function naiveIncludes(main, sub) {
    let n = main.length;
    let m = sub.length;
    for (let i = 0; i <= n - m; i++) {
        let found = true;
        for (let j = 0; j < m; j++) {
            if (main[i + j] !== sub[j]) {
                found = false;
                break;
            }
        }
        if (found) return true;
    }
    return false;
}

// Usage for the rotation problem:
function canShiftNaive(s, goal) {
    if (s.length !== goal.length) return false;
    return naiveIncludes(s + s, goal);
}