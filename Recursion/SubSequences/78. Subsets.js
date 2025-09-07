// https://leetcode.com/problems/subsets/description/

/*
Iterative

O(2^n * n) & O(2^n * n)

*/

var subsets = function(nums) {
    
    let subsets = [[]]
    let temp
    for(let num of nums) {
        const n = subsets.length
        for(let i = 0; i < n; i++) { // we keep iterative over the available subsets and add the num, [], [1], [2], [1,2], [3], [1,3], [2, 3], [1,2,3]
            temp = [...subsets[i]]
            temp.push(num)
            subsets.push(temp)
        }
    }
    return subsets
};


/*

Recursive

O(2^n * n) & O(2^n * n)

*/


var subsets = function(nums) {
    let res = []
    let subsets = []
    const dfs = (i) => {
        if (i >= nums.length) {
            res.push([...subsets])
            return
        }

        subsets.push(nums[i]) // we keep pushing and move to the next index, it goes like a tree structure where we take a decision to include or not
        dfs(i + 1)
        subsets.pop()
        dfs(i + 1)
    }

    dfs(0)
    return res
};

/*

                       1 2 3
 				  /           \
 		    	1 			     []	
              /     \           /.  \
            1 2	     1	       2.    []
           /  \		/ \       / \    / \
        123.   12. 13. 1.    23. 2. 3. [].

*/