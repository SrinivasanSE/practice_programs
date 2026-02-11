// https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/description/


/*

Better - Binary Search

O(nlogn) & O(n)

*/




var smallerNumbersThanCurrent = function (nums) {

    const sorted = [...nums].sort((a, b) => a - b)

    const ans = []

    for (let num of nums) {
        ans.push(lowerBound(sorted, num))
    }

    return ans
};


/*

Optimal - prefix sum

O(n) & O(1)

*/


var smallerNumbersThanCurrent = function(nums) {

   // Frequency array to count how many times each number appears.
   // Since nums[i] is always between 0 and 100, size 101 is enough.
   const freq = new Array(101).fill(0)

   // smaller[i] will store:
   //    → how many numbers in nums are strictly smaller than i
   const smaller = new Array(101)

   // Base case:
   // There are NO numbers smaller than 0.
   smaller[0] = 0
   
   // Count the frequency of each number in nums
   for (let num of nums) {
      freq[num]++
   }

   // Build prefix sum:
   // smaller[i] = count of all numbers < i
   //
   // Example:
   // smaller[5] = freq[0] + freq[1] + freq[2] + freq[3] + freq[4]
   for (let i = 1; i <= 100; i++) {
      smaller[i] = smaller[i - 1] + freq[i - 1]
   }

   // For each number num in nums:
   // The answer is simply: how many numbers are smaller than num?
   // Which is stored in smaller[num].
   return nums.map(num => smaller[num])
};
