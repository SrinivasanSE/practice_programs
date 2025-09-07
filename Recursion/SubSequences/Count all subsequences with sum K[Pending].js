// 

// dp sol is there

function findWays(arr, k) {
    const n = arr.length;
    const MOD = 1e7 + 1;

    function findCount(index, sum) {
        if (sum > k) return 0;
        if (index === n) return sum === k ? 1 : 0;

        // include + exclude
        return (
            (findCount(index + 1, sum + arr[index]) +
             findCount(index + 1, sum)) % MOD
        );
    }

    return findCount(0, 0);
}
