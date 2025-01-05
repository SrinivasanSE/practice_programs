// https://www.geeksforgeeks.org/count-triplets-with-sum-smaller-than-a-given-value/

countTriplets(arr,n,target){
        //code here
        let count = 0
        arr.sort((a, b) => a - b)
        for(let i = 0; i < n - 2; i++) {
            let l = i + 1
            let r = n - 1
            
            while (l < r) {
                const sum = arr[i] + arr[l] + arr[r]
                
                if (sum < target) {
                    count+= (r - l)
                    l++
                } else {
                    r--
                }
            }
        }
        
        return count
    }
