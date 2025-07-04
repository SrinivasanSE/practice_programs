
class Solution {
    isArmstrong(n) {
        let sum = 0
        let temp = n
        while (temp > 0) {
            sum += Math.pow(temp % 10, 3)
            temp = Math.floor(temp/10)
        }

        return sum === n
    }
}