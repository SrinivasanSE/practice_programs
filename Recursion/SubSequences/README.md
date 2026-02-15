## Generate Binary Strings

    - Iterative
        we will start with ['0', '1'] and run two loops, one from 2 to n and we will init the temp arr and loop through the res arr and check the prev char from the str and push to the temp arr. Replace the res arr with the temp.

    - Recursion

        For generating all

        call, generate(n - 1, '0') and generate(n - 1, '1')
        when n is 0, push the str to the res arr

        For generating without adjacent 0 or 1

        We need to track prev bin str and if the prev != '0', then only call the generate for adding '0'

## Generate Parentheses

    - Iterative
        Use queue and track the path, open and close bracket count. If the open and close count is n, that means we formed the str, we can push to res. If open < n, we can add the open bracket, if close < open, we can add the close bracket.

    - Recursion
        We will pass the i, str, open, close count as params and follow the same logic.

## 78. Subsets

    - Iterative
        We will init the res arr with [[]] and run two loops. We will loop through the given nums and find the length of the res and run the next loop from 0 to length, copy the res[i] to the temp arr and push the curr num to the temp arr and push temp arr to the subset arr.

    - Recursion
        We will use pick and not pick approach. If i == n, push the res arr to the subsets.
        push the nums[i] to the arr and call the generate function
        pop the res arr and call the generate function again

## 90. Subsets II (Duplicates in the input arr, but there should not be duplicates in the output)

    We will use pick and not pick approach. If i == n, push the res arr to the subsets.
    push the nums[i] to the arr and call the generate function
    skip the duplicates by using while loop
    pop the res arr and call the generate function again

# Sum related problems, target given - Pick/Not Pick

## Find all subsequences with sum equals to K

    We need to track the sum and the arr. If i == n and sum == k, add the arr to the res. If sum > k, return
    push the curr index num to the arr and also add the num to the sum while calling the generate function with i + 1.
    pop the element and call the generate function again with i + 1

## Count all subsequences with sum K

    We need to track the sum only here. If i == n and sum == k, increment the count. If sum > k, return
    Add the curr index num to the sum while calling the generate function with i + 1.
    And just call the generate function with the same sum again and i + 1.

## Check if there exists a subsequence with sum K

    We need to track the sum only here. If i == n and sum == k, return true. If sum > k, return false
    Do or operation btw two functions calls. Add the curr index num to the sum while calling the generate function with i + 1.
    Just call the generate function with the same sum and i + 1.

## Combination Sum (Print the arr) - for loop

    We need to track the sum and the arr. If sum == k, add the arr to the res. If sum > k, return.
    Run the for loop from the index to the n. Push the curr num to the arr and call generate with the **same index** and pop after that.
    generate(start, sum + candidates[start], arr)

## Combination Sum II (Print the arr) - for loop

    We need to track the sum and the arr. If sum == k, add the arr to the res. If sum > k, return.
    Run the for loop from the index to the n.
    Skip duplicate elements at the same recursion level to avoid repeated combinations.
    If sum + candidates[start] > target, break and stop further iteration (array is sorted).
    Push the curr num to the arr and call generate with the start + 1 and pop after that.
    generate(start + 1, sum + candidates[start], arr)

## Combination Sum III (Print the arr) - for loop

    Input arr is not given and the range is from 1 to 9. We need to track the sum, the arr, count and the ind. If count == k and sum == target, add the arr to the res.
    Run the for loop from the ind to the n.
    If sum + start > target, break and stop further iteration as we are iterating in sorted order.
    Push the curr start to the arr and call generate func with the params and pop after that.
    generate(sum + start, start + 1, count + 1, arr)

## Print sums of all subsets of a given set (target not given)

    We need to track the sum only here. If i == n, add the sum to the res.
    Add the curr index num to the sum while calling the generate function with i + 1.
    And just call the generate function with the same sum again and i + 1.
