// https://www.geeksforgeeks.org/find-out-the-person-who-got-the-ticket-last/


// JavaScript version of the distribute function
function distribute(n, k) {
    let dq = [];

    for (let i = 1; i <= n; i++) {
        dq.push(i);
    }

    while (dq.length > 1) {
        for (let i = 0; i < k && dq.length > 1; i++) {
            dq.shift();
        }

        for (let i = 0; i < k && dq.length > 1; i++) {
            dq.pop();
        }
    }

    return dq[0];
}

class Solution {
    distributeTicket(n, k) {
        // code here
        let left = 1
        let right = n

        while (left < right) {
            if (left + k > right) { // if left crosses right, that means there are no persons available in the left, so the last person will be in the right
                return right
            }
            left += k

            if (right - k < left) {
                return left
            }

            right -= k
        }

        return left
    }
}