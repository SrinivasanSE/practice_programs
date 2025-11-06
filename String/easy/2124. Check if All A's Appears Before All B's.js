// https://leetcode.com/problems/check-if-all-as-appears-before-all-bs/description/



var checkString = function (s) {
    let ss = s.split('').sort().join('');
    return ss == s;
}



var checkString = function(s) {
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === 'b' && s[i + 1] === 'a') {
            return false;
        }
    }
    return true;
};