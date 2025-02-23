// https://www.geeksforgeeks.org/multiply-two-numbers-represented-linked-lists/


class Solution {
    multiplyTwoLists(first, second) {
        let num1 = BigInt(0), num2 = BigInt(0);
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
