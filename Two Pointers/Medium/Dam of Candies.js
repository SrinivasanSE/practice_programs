// https://www.geeksforgeeks.org/maximum-water-that-can-be-stored-between-two-buildings/


function maxCandy(height, n)
{
	let maximum = 0;

	// Check all possible pairs of buildings
	for (let i = 0; i < n - 1; i++) {
		for (let j = i + 1; j < n; j++) {
			let current = (Math.min(height[i],
							height[j])
						* (j - i - 1));

			// Maximum so far
			maximum = Math.max(maximum, current);
		}
	}
	return maximum;
}


class Solution {
    maxCandy(height, n) {
        // code here
        
        if (n <= 1) {
            return 0
        }
        let res = 0
        
        let l = 0
        let r = n - 1
        
        while (l < r) {
            
            res = Math.max(res, Math.min(height[l], height[r])*(r - l - 1))
            if (height[l] < height[r]) {
                l++
            } else {
                r--
            }
        }
        
        return res
    }
}
	
	

