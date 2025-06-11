// https://www.geeksforgeeks.org/find-minimum-maximum-amount-buy-n-candies/

class Solution {
    candyStore(candies, N, K) {
        let first = 0;
        let last = N - 1;
        let minC = 0;
        let maxC = 0;
        candies.sort((a, b) => a - b);

        for (let i = 0; i < N; i++) {
            if (last >= i) {
                minC += candies[i];
                last -= K;
            }
            if (first <= N - i - 1) {
                maxC += candies[N - i - 1];
                first += K;
            }
        }
        return [minC, maxC];
    }
}