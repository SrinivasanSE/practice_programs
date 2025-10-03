// https://www.geeksforgeeks.org/dsa/lemonade-stand-change-challenge/
// https://leetcode.com/problems/lemonade-change/description/

function lemonadeChange(N, bills) {

// count of $5 bills
    let count5 = 0; 
    
 // count of $10 bills
    let count10 = 0; 

    for (let i = 0; i < N; i++) {
        if (bills[i] === 5) {
            count5++;
        } else if (bills[i] === 10) {
            if (count5 < 1) {
            
            // unable to provide change
                return false; 
            }
            count5--;
            count10++;
        } else if (bills[i] === 20) {
            if (count10 >= 1 && count5 >= 1) {
                count10--;
                count5--;
            } else if (count5 >= 3) {
                count5 -= 3;
            } else {
            
            // unable to provide change
                return false; 
            }
        }
    }

    return true;
}