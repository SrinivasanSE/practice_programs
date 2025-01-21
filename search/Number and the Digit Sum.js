// https://www.geeksforgeeks.org/count-numbers-difference-number-digit-sum-greater-specific-value/

/*

if k – sumofdigit(k) >= diff then
above equation will be true for (k+1)
also because we know that sumofdigit(k+1)
is not greater than sumofdigit(k) + 1
so, k + 1 - sumofdigit(k + 1) >= 
k - sumofdigit(k)
but we know that right side of above 
inequality is greater than diff, 
so left side will also be greater than 
diff.
So, finally we can say that if a number k satisfies the difference condition then (k + 1) will also satisfy same equation so our job is to find the smallest number which satisfies the difference condition then all numbers greater than this and up to N will satisfy the condition so our answer will be N – smallest number we found. 
We can find the smallest number satisfying this condition using binary search so total time complexity of solution will be O(log N) 

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
           } else {
               r = mid - 1 // high is the largest number that does not satisfy the condition.
           }
       }
       return n - r // The calculation N - high gives the count of numbers from this smallest number up to ( N ) that satisfy the condition.
      
    }
}
