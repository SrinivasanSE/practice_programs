// https://leetcode.com/problems/palindrome-number/
// https://leetcode.com/problems/valid-palindrome/

var isPalindrome = function(x) {
    if (x < 0) {
        return false
    }

    let rev = 0,dup = x

    while (dup > 0) {
        rev = 10*rev + dup % 10
        dup = Math.floor(dup/10)

    }

    return rev === x

};


// for strings

var isPalindrome = function(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;    
};


var isPalindrome = function(s) {
    let left = 0, right = s.length - 1;

    while (left < right) {
        while (left < right && !isAlphaNum(s[left])) left++;
        while (left < right && !isAlphaNum(s[right])) right--;

        if (s[left].toLowerCase() !== s[right].toLowerCase())
            return false;

        left++;
        right--;
    }

    return true;
};

function isAlphaNum(c) {
    return /^[a-z0-9]$/i.test(c);
}