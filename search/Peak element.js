// https://www.geeksforgeeks.org/find-a-peak-in-a-given-array/
/*

Key Points:
If an element is smaller than its next element, at least one peak will exist on the right side of this element.

Why? Because the array increases, and eventually it must decrease somewhere (or end), forming a peak.
If an element is smaller than its previous element, at least one peak will exist on the left side of this element.

Why? The array decreases, and before the decrease, there must be an increase or start, which forms a peak.

*/



peakElement(arr) {
        const n = arr.length
        
        if (n === 1 || arr[0] >= arr[1]) {
            return 0
        }
        
        for(let i = 1; i < n - 1; i++) {
            if ((arr[i - 1] < arr[i]) && (arr[i] >arr[i + 1])) {
                return i
            }
        }
        
        if (arr[n - 1] > arr[n - 2]) {
            return n - 1
        }
        return -1
    }


peakElement(arr) {
        const n = arr.length
        
        for(let i = 0; i < n; i++) {
            let left = true
            let right = true
            
            if ( i < 0 && arr[i] <= arr[i - 1]) {
                left = false
            }
            
            if (i < n - 1 && arr[i] <= arr[i+1]) {
                right = false
            }
            
            if(left && right) {
                return i
            }
        }
        
    }

peakElement(arr) {
        const n = arr.length
        if ( n===1) {
            return 0
        }
        
        if (arr[0] > arr[1]) {
            return 0
        }
        
        if (arr[n - 1] > arr[n - 2]) {
            return n - 1
        }
        let l = 1
        let r = n - 2
        
        while (l <= r) {
            const mid = l + Math.floor(( r- l)/2)
            if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) {
                return mid
            }
            if (arr[mid] < arr[mid - 1]) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        
        return -1
        
    }
