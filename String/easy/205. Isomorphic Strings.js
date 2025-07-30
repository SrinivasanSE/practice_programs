// https://leetcode.com/problems/isomorphic-strings/description/


/*
Brute 
O(n^2) & O(1)

*/


var isIsomorphic = function(s, t) {
    const n = s.length

    let c1, c2

    for(let i = 0; i < n; i++) {
        c1 = s[i]
        c2 = t[i]

        for(let j = 0; j < n; j++) {

            if (s[j] === c1 && t[j] !== c2) {
                return false
            }

            if (t[j] === c2 && s[j] !== c1) {
                return false
            }
        }
    }

    return true
};

/*
Better

*/


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    const hashmap1 = new Map()
    const hashmap2 = new Map()

    const n = s.length

    let i = 0

    while (i < n) {
        if((hashmap1.get(s[i]) && hashmap1.get(s[i]) != t[i]) || (hashmap2.get(t[i]) && hashmap2.get(t[i]) != s[i]) ) {
            return false
        }

        hashmap1.set(s[i], t[i])
        hashmap2.set(t[i], s[i])

        i++
    }

    return true
};

// index based

var isIsomorphic = function(s, t) {
    const n = s.length

    const h1 = {}
    const h2 = {}

    for(let i = 0; i < n; i++) {
        if (!(s[i] in h1)) {
            h1[s[i]] = i
        }
        if (!(t[i] in h2)) {
            h2[t[i]] = i
        }

        if (h1[s[i]] != h2[t[i]]) {
            return false
        }
    }

    return true
};

/*
Optimal

*/


var isIsomorphic = function(s, t) {
    const hashmap = {}

    for (let i = 0; i < s.length; i++) {
        let sCh = s[i];
        let tCh = t[i];

        if (sCh in hashmap) {
            if (hashmap[sCh] != tCh) {
                return false
            }
        } else if (Object.values(hashmap).includes(tCh)) {
            return false
        }
        
        hashmap[sCh] = tCh
    }
    return true;
};