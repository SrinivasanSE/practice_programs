// https://www.geeksforgeeks.org/delete-consecutive-words-sequence/

class Solution {
    removeConsecutiveSame(arr) {
        // code here
        let s = []
        
        for(let i = 0; i < arr.length; i++) {
            if(s.length === 0) {
                s.push(arr[i])
            } else {
                if (s[s.length - 1] === arr[i]) {
                    s.pop()
                } else {
                    s.push(arr[i])
                }
            }
        }
        
        return s.length
    }
}


// without stack
function removeConsecutiveSame(v) 
{ 
	let n = v.length; 

	// Start traversing the sequence 
	for (let i = 0; i < n - 1;) 
	{ 
	
		// Compare the current string with 
		// next one Erase both if equal 
		if (v[i] == (v[i + 1])) 
		{ 
		
			// Erase function delete the element and 
			// also shifts other element that's why 
			// i is not updated 
			v.splice(i, 1); 
			v.splice(i, 1); 

			// Update i, as to check from 
			// previous element again 
			if (i > 0) { 
				i--; 
			} 

			// Reduce sequence size 
			n = n - 2; 
		} 

		// Increment i, if not equal 
		else { 
			i++; 
		} 
	} 

	// Return modified size 
	return v.length; 
} 

