// https://leetcode.com/problems/hand-of-straights/description/
// https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/

// Learn other optimised approaches in editorial

/*

Brute

O(N + MlogM) & O(M)
*/


var isNStraightHand = function(hand, groupSize) {
    const N = hand.length;
    if (N % groupSize !== 0) return false;
    const heap = new MinHeapC()

    const map = new Map()

    for (let card of hand) { // O(N)
        map.set(card, (map.get(card) || 0) + 1)
    }

    for (let key of map.keys()) { // O(MlogM) , M - no of unique cards 
        heap.insert(key) // // contains unique cards
    }
    let currentCard, temp
    while (!heap.isEmpty()) {
        currentCard = heap.getMin()
        for(let i = 0; i < groupSize; i++) { // Runs only for N cards, O(N)
            temp = currentCard + i
            if(!map.has(temp) || map.get(temp) === 0) {
                return false
            }
            map.set(temp, map.get(temp) - 1)
            if (map.get(temp) === 0) {
                if (temp != heap.getMin()) { // if the heap top is not matching, that means we are trying to remove the card which is not in the top
                    // and the card in the top can't form the consecutive group again, ex.top - 4, 5 count has become 0, that means 4 can't form the next grp
                    return false
                }

                heap.extractMin() // happens only once for each distinct card, O(MlogM)
            }
        }
    }

    return true

};



/*

Better
O(NlogN) & O(N)

*/


var isNStraightHand = function(hand, groupSize) {
    const n = hand.length

    if (n % groupSize != 0) return false

    const map = new Map()

    for (let card of hand) {
        map.set(card, (map.get(card) || 0) + 1)
    }

    const sorted = [...hand].sort((a, b) => a - b) // O(NLogN)
    let currentCard, freq
    for(let card of sorted) { // even though two for loops are there, the second for loop does not run always and each card only decremented once, so O(N)
        if (map.get(card) === 0) {
            continue
        }
        freq = map.get(card)
        for (let i = 0; i < groupSize; i++) {
            currentCard = card + i
            if (!map.has(currentCard) || map.get(currentCard) < freq) return false // by using freq, we are considering multiple groups at once itself
            // [1,1,2,2,3,3] if the freq is more,that means we can't form the next group again with the starting card
            map.set(currentCard, map.get(currentCard) - freq)
        }
    }

    return true

};