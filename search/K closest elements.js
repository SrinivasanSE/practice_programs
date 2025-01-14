// https://www.geeksforgeeks.org/find-k-closest-elements-given-value/

// More efficient sol available using sliding window, check below.

printKClosest(arr, n, k, x) {
        let crossover = -1
        
        for(let i = 0; i < n; i++) {
            if (arr[i] > x) {
                crossover = i
                break
            }
        }
      
        
        if (crossover === -1) {
            crossover = n
        }

  // let crossover = this.findCrossOver(arr, 0, n - 1, x)
        
        let l = crossover - 1
        let r = crossover
        const res = []
        while (k > 0) {
            if (arr[l] === x) {
                l--
            }
            if (arr[r] === x) {
                r++
            }
            if (l >= 0 && r < n) {
                
                const diffLeft = Math.abs(arr[l] - x)
                const diffRight = Math.abs(arr[r] - x)
                
                if (diffLeft >= diffRight) {
                    res.push(arr[r++])
                } else {
                    res.push(arr[l--])
                }
            }
            
            else if (l >= 0) {
                res.push(arr[l--])
            } else if (r < n) {
                res.push(arr[r++])
            }
            
            k--
        }
        
        //console.log(res)
        return res
    }
    
    findCrossOver(arr, l, r, x) {
        if(arr[r] <= x) {
            return r
        }
        if (arr[l] >= x) {
            return l
        }
        
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            /*
            if (mid > 0 && arr[mid] >= x && arr[mid - 1] < x) {
                return mid
            }
            */
            if (arr[mid] <= x) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return l
    }
}

/*

We need to return k elements that are closest to x. The input array is sorted in ascending order. So, we will try to find the starting point of these k elements i.e. the first element in this list of k elements which will make it easier to return the k elements. Let's call this first element of the output list low.

We will initially create a boundary of size k . Why size k? Because the starting point of the boundary will give us the k elements we need.

So initially our low bound will be 0. The upper bound will be length of array - k. Why?

Suppose our array is 1 2 3 4 5 and k=2 . Then in our final output start of the window must lie between 0 and 4 . If it lies at 5, we cannot pick k elements. So, it makes sense for our upper bound to be len(arr) - k.

Now, we want to do a binary search in order to optimise or find the correct start boundary.

The following are the cases :

x<=arr[mid].
x>=arr[mid+k]
arr[mid] < x < arr[mid+k]
I will be explaining alll these cases.

Consider what are the boundaries for our element x.

left.....mid....mid+k...........right

x<=arr[mid].
There are k+1 elements between mid and mid+k,inclusive. if x<=arr[mid], then mid+k element won't be part of our output since the array is sorted and x will be further away from mid+k element. So, in order to change the start of the boundary, our boundary can't start from mid+1 anymore (because we won't be able to include k elements.) Thus, we realise that the boundary for k elements needs to either start at mid or before it. Thus, high moves to mid(not mid-1) because mid is a valid value for the k element starting window.
2.x>=arr[mid+k]
Quite similar to the case above,if x is not less than or equal to mid, that is x is greater than mid, then the boundary for start of our answer lies after mid(excluding mid), thus low moves to mid+1.

arr[mid] < x < arr[mid+k]
If both of the earlier condtions are not satisified, then we consider the distance of x from both the mid and mid+k . If x is closer to mid,similar to the 1st case, move it away from mid+k and move high to mid. else move low to mid+1.

*/

var findClosestElements = function(arr, k, x) {
    let l = 0
    let r = arr.length - k

    while (l < r) {
        const mid = l + Math.floor((r - l)/2)

        // if (arr[mid] >= x) {
        //     r = mid
        // } else if (arr[mid + k] <= x) {
        //     l = mid + 1
        // } else {
        //     const dist1 = Math.abs(x - arr[mid])
        //     const dist2 = Math.abs(x - arr[mid + k])

        //     if (dist1 <= dist2) {
        //         r = mid
        //     } else {
        //         l = mid + 1
        //     }
        // }

        if (x - arr[mid] > arr[mid + k] - x) {
            l = mid + 1
        } else {
            r = mid
        }
    }

    return arr.slice(l, l + k)
};
