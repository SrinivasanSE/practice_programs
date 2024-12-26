// https://www.geeksforgeeks.org/find-the-largest-pair-sum-in-an-unsorted-array/


pairsum(arr) {
        let first = arr[0]
        let second = arr[1]
        
        if (first < second) {
            first = arr[1]
            second = arr[0]
        }
        
        
        for(let i = 2; i < arr.length; i++) {
            if (first < arr[i]) {
                second = first
                first = arr[i]
            } else if (second < arr[i]) {
                second = arr[i]
            }
            
        }
        
        return first + second
    }
