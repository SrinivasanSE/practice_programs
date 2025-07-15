// https://leetcode.com/problems/4sum/description/

/*

Brute force - 4 loops
O(n^4)
*/




function fourSum(nums, target) {
  let n = nums.length;
  let set = new Set();
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        for (let l = k + 1; l < n; l++) {
          let sum = nums[i] + nums[j] + nums[k] + nums[l];
          
          if (sum === target) {
            let temp = [nums[i], nums[j], nums[k], nums[l]];
            temp.sort((a, b) => a - b);
            set.add(temp);
          }
        }
      }
    }
  }
  
  let ans = Array.from(set);
  return ans;
}

/*
Better - Hashing
O(n^3) & O(n)

*/

var fourSum = function(nums, target) {
    const n = nums.length
    let req = 0, res = [], resultSet = new Set()

    for(let i = 0; i < n - 3; i++) {
        for(let j = i + 1; j < n - 2; j++ ) {
            let set = new Set()
            for(let k = j + 1; k < n; k++) {
                req = target - (nums[i] + nums[j] + nums[k])

                if (set.has(req)) {
                    let temp = [nums[i], nums[j], nums[k], req].sort((a, b) => a - b)
                    let key = temp.join(',')

                    if (!resultSet.has(key)) {
                        resultSet.add(key)
                        res.push(temp)
                    }
                }

                set.add(nums[k])
            }

        }
    }
    
    return res
};

/*
Optimal - Sorting
O(n^3) & O(1)
*/

var fourSum = function(nums, target) {
    const n = nums.length
    let sum = 0, res = [], l,r
    nums.sort((a, b) => a - b)

    for(let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        for(let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue
            }
            l = j + 1
            r = n - 1

            while (l < r) {
                sum = nums[i] + nums[j] + nums[l] + nums[r]
                if (sum === target) {
                    res.push([nums[i], nums[j], nums[l], nums[r]])

                    while (l < r && nums[l] === nums[l + 1]) l++
                    while (l < r && nums[r] === nums[r - 1]) r--

                    l++
                    r--
                } else if (sum < target) {
                    l++
                } else {
                    r--
                }
            }
        }
    }

    return res
};