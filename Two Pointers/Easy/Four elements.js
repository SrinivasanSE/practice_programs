// https://www.geeksforgeeks.org/find-four-numbers-with-sum-equal-to-given-sum/


function check4Sum(arr, target) {
    const n = arr.length;

    arr.sort((a, b) => a - b);
    for (let i = 0; i < n - 3; i++) {
        for (let j = i + 1; j < n - 2; j++) {

            // Find the remaining two elements
            // using two pointers
            let l = j + 1, r = n - 1;
            while (l < r) {
                const sum = arr[i] + arr[j] + arr[l] + arr[r];

                if (sum === target) {
                    return true;
                } else if (sum < target) {
                    l++;
                } else {
                    r--;
                }
            }
        }
    }

    return false;
}


function check4Sum(arr, target) {
    const n = arr.length;

    const mp = {};
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            mp[arr[i] + arr[j]] = [i, j];
        }
    }

    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            const sum = arr[i] + arr[j];

            // If target - sum is present in the hash map
            if (mp[target - sum]) {
                const p = mp[target - sum];

                // Check that all elements are different array elements 
                if (p[0] !== i && p[0] !== j && p[1] !== i && p[1] !== j)
                    return true;
            }
        }
    }

    return false;
}
