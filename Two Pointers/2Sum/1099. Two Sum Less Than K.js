// https://www.geeksforgeeks.org/pair-with-largest-sum-which-is-less-than-k-in-the-array/



class Solution {
    maxSum(arr, k) {
        // Sort the array in ascending order
        arr.sort((a, b) => a - b);

        let maxsum = 0;
        let a = -1;
        let b = -1;
        let i = 0, j = arr.length - 1; // Use arr.length to set the correct last index

        // Iterate through the array to find the pair with the max sum less than k
        while (i < j) {
            if (arr[i] + arr[j] < k) {
                if (arr[i] + arr[j] > maxsum) {
                    maxsum = arr[i] + arr[j];
                    a = arr[i];
                    b = arr[j];
                }
                i++; // Increase i to try a larger element
            } else {
                j--; // Decrease j to try a smaller element
            }
        }
        
        return [a, b]; // Return the pair that has the maximum sum less than k
    }
}