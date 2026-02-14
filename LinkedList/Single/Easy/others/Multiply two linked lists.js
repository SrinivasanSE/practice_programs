// https://www.geeksforgeeks.org/multiply-two-numbers-represented-linked-lists/
// https://www.geeksforgeeks.org/modulo-1097-1000000007/

class Solution {
  multiplyTwoLists(first, second) {
    let num1 = BigInt(0),
      num2 = BigInt(0);
    const mod = BigInt(1000000007);

    while (first || second) {
      if (first) {
        num1 = (num1 * BigInt(10) + BigInt(first.data)) % mod;
        first = first.next;
      }
      if (second) {
        num2 = (num2 * BigInt(10) + BigInt(second.data)) % mod;
        second = second.next;
      }
    }
    let ans = (num1 * num2) % mod;
    return ans;
  }
}

// https://www.geeksforgeeks.org/decimal-equivalent-of-binary-linked-list/
class Solution {
  decimalValue(head) {
    // Define the MOD constant to prevent overflow for large numbers
    const MOD = 1000000007;

    // Initialize result to store the decimal value of the binary linked list
    let res = 0;

    // Traverse through the linked list until the end (null)
    while (head != null) {
      // Multiply the current result by 2 (shifting left in binary),
      // add the node's data, and take modulo to avoid overflow
      res = (((res * 2) % MOD) + head.data) % MOD;

      // Move to the next node in the linked list
      head = head.next;
    }

    // Return the final decimal value
    return res;
  }
}
