// https://www.geeksforgeeks.org/problems/seating-arrangement--170647/1?page=1&category=Greedy&difficulty=Easy&status=unsolved&sortBy=submissions


class Solution {
    // Function to check whether it is possible to get all seats occupied.
    is_possible_to_get_seats(n, m, seats) {
        // your code here
        let prev, next, availableSeats = 0
        for(let i = 0; i < m; i++) {
           if (i === 0) {
               prev = 0
           } else {
               prev = seats[i - 1]
           }
           
           if (i === m - 1) {
               next = 0
           } else {
               next = seats[i + 1]
           }
           
           if (prev + next + seats[i] === 0) { // if prev, current and next seat is empty, the seat is available
               i++ // skip the next seat since it's already checked
               availableSeats++
           }
        }
        
        return availableSeats >= n
    }
}