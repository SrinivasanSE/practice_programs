// https://www.geeksforgeeks.org/count-numbers-difference-number-digit-sum-greater-specific-value/
// https://www.geeksforgeeks.org/problems/all-numbers-with-specific-difference3558/1

/*

Suppose for some integer k, the condition k - digitSum(k) >= d holds. Now consider any integer k' > k. 
Since k' > k, the numeric value has increased, and while the digit sum digitSum(k') may increase as well, it increases much slower than k' because each digit can only contribute at most 9. Therefore, the gap k' - digitSum(k') grows with increasing k'. 
This implies that if the condition holds for k, it must also hold for any k' > k, making the predicate monotonic and thus suitable for binary search.

*/

class Solution
{
    
    sumOfDigits(num) {
        let sum = 0
        
        while (num > 0) {
            const rem = num%10
            sum+= rem
            num= Math.floor(num/10)
        }
        
        return sum
    }
    //Function to count the number of occurrences of k in the given number.
    numberCount(n, k)
    {
       let l = 1
       let r = n
       while (l <= r) {
           const mid = l + Math.floor((r - l)/2)
           
           if (mid - this.sumOfDigits(mid) < k) {
               l = mid + 1 // to increase the diff, l will point to the smallest number which satisfies the given condition
           } else { // if it's greater, all the numbers after mid will be greater anyway, so search in the left to find the first number which is greater
               r = mid - 1 // the largest number that does not satisfy the condition.
           }
       }
       return n - r // The calculation N - high gives the count of numbers from this smallest number up to ( N ) that satisfy the condition.
      
    }
}
