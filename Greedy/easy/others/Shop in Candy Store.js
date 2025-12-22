// https://www.geeksforgeeks.org/find-minimum-maximum-amount-buy-n-candies/

class Solution {
    candyStore(candies, N, K) {
        let first = 0;
        let last = N - 1;
        let minC = 0;
        let maxC = 0;
        candies.sort((a, b) => a - b); // sorting is important

        for (let i = 0; i < N; i++) {
            if (last >= i) { // try to buy the cheap candies first, if i exceeds last, then all the candies have been bought
                minC += candies[i];
                last -= K; // We are getting K costliest candies for free
            }
            if (first <= N - i - 1) { // try to buy the costliest candies first, if first exceeds then all the candies have been bought
                maxC += candies[N - i - 1];
                first += K; // we are getting k cheap candies for free
            }
        }
        return [minC, maxC];
    }
}