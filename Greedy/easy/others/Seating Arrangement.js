// https://www.geeksforgeeks.org/problems/seating-arrangement--170647/1?page=1&category=Greedy&difficulty=Easy&status=unsolved&sortBy=submissions

// O(m) & O(1)

class Solution {
    is_possible_to_get_seats(n, m, seats) {
        let prev, next, availableSeats = 0
        for (let i = 0; i < m; i++) {
            
            // 1️⃣ Find the left neighbor (prev)
            if (i === 0) {
                prev = 0 // first seat → no left neighbor, assume empty
            } else {
                prev = seats[i - 1]
            }

            // 2️⃣ Find the right neighbor (next)
            if (i === m - 1) {
                next = 0 // last seat → no right neighbor, assume empty
            } else {
                next = seats[i + 1]
            }

            // 3️⃣ Check if we can seat someone here
            if (prev + next + seats[i] === 0) {
                i++ // skip the next seat (can't place adjacent)
                availableSeats++
            }

            // 4️⃣ If enough seats filled, done early
            if (availableSeats >= n) return true
        }

        // 5️⃣ Not enough seats
        return false
    }
}
