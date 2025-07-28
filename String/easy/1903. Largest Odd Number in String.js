// https://leetcode.com/problems/largest-odd-number-in-string/description/

// backward traversal


var largestOddNumber = function(num) {
    let str = ""
    let end = -1
    for(let i = num.length - 1; i >= 0; i--) {
        if ((num[i] - '0') % 2 != 0) {
            end = i
            break
        }
    }
    for(let i = 0; i <= end; i++) {
        str += num[i]
    }

    return str
};

// front traversal


var largestOddNumber = function(num) {
    let str = ""
    for(let i = 0; i < num.length; i++) {
        if ((num[i] - '0') % 2 != 0) {
            str = num.substring(0, i + 1) // keep updating the str
        }
    }
    
    return str
};