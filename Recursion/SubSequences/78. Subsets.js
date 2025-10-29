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
        for(let i = 0; i < n; i++) { // we keep iterative over the available subsets and add the num, [1], added 1
                                                                                                     // [2], [1,2],  added 2 to the existing subsets
                                                                                                     // [3], [1,3], [2, 3], [1,2,3] added 3 to the existing subsets
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


/*

Bit method

O(2^n * n) & O(2^n * n)

*/

var subsets = function(nums) {
    const n = nums.length; // Number of elements in the input array

    // Total number of subsets is 2^n (each element can be present or absent)
    const subsetsCount = 1 << n; // 1 << n is equivalent to 2^n

    const res = []; // Array to hold all subsets

    let temp; // Temporary array to build each subset

    // Iterate through all possible subset combinations
    for (let i = 0; i < subsetsCount; i++) {
        temp = []; // Start with an empty subset

        // For each element in nums, decide whether to include it in the current subset
        for (let j = 0; j < n; j++) {
            // Check if the j-th bit in i is set (i.e., include nums[j] in this subset)
            if (i & (1 << j)) {
                temp.push(nums[j]);
            }
        }

        // Add the constructed subset to the result array
        res.push(temp);
    }

    // Return the array containing all subsets
    return res;
};

/*

Suppose nums = [a, b, c] (n = 3):

The binary numbers from 0 to 7 (which is 2^3 - 1) are:

000 → [] (no elements included)
001 → [a]
010 → [b]
011 → [a, b]
100 → [c]
101 → [a, c]
110 → [b, c]
111 → [a, b, c]



The code systematically generates each of these by checking the bits of each numb

*/