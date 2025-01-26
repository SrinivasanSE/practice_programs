// https://www.geeksforgeeks.org/allocate-minimum-number-pages/

/*
The Minimum Possible Page Limit
Reason:
No student can be assigned fewer pages than the largest book.
If pageLimit is smaller than the largest book, it's impossible to allocate that book to any student.
Calculation:
minPageLimit = Math.max(...arr)
Example:
Books: [12, 34, 67, 90]
Largest book: 90
Minimum pageLimit: 90.

The Maximum Possible Page Limit
Reason:
If we assign all books to a single student, they will have to read the sum of all pages.
This represents the worst-case scenario where 1 student reads everything.
Calculation:
maxPageLimit = arr.reduce((a, b) => a + b, 0)
Example:
Books: [12, 34, 67, 90]
Sum: 12 + 34 + 67 + 90 = 203
Maximum pageLimit: 203.

The Role of pageLimit
The pageLimit is the maximum number of pages that a single student is allowed to read.
When distributing books:
We start assigning books to one student, summing up the pages (pageSum).
If adding a book would cause pageSum to exceed pageLimit, we stop assigning books to the current student and move on to the next student.

Why Check if pageSum > pageLimit?
Avoid Overloading a Student:

If pageSum exceeds pageLimit, the current student cannot handle more books.
At this point, we assign the current book to a new student and reset pageSum for the new student.
Respect the pageLimit Constraint:

The entire purpose of the algorithm is to ensure that no student reads more pages than pageLimit. Checking pageSum helps enforce this constraint.

*/
//Time Complexity: O(n*(Sum(arr) – MAX)), where n is the total number of books, sum(arr) is the total number of pages in all the books and MAX is maximum number of pages in any book. Auxiliary Space: O(1)
findPages(arr, k) {
        const n = arr.length
        
        if (n < k) {
            return -1
        }
        
        const minLimit = Math.max(...arr)  // 
        const maxLimit = arr.reduce((accum, num) => num + accum, 0)
        
        for(let i = minLimit; i <= maxLimit; i++) {
            let cnt = 1
            let sum = 0
            for(let j = 0; j < n; j++) {
                if (sum + arr[j] > i) {
                    cnt++
                    sum = arr[j]
                } else {
                    sum += arr[j]
                }
            }
            
            if (cnt <= k) {
                return i
            }
        }   
    }


// binarySearch

/*

The maximum number of pages(page limit) that a student can be allocated has a monotonic property:


If, at a page limit p, books cannot be allocated to all k students, then we need to reduce the page limit to ensure more students receive books.
If, at a page limit p, we can allocate books to more than k students, then we need to increase the page limit so that fewer students are allocated books.

*/

findPages(arr, k) {
        const n = arr.length
        
        if (n < k) {
            return -1
        }
        
        const minLimit = Math.max(...arr)
        const maxLimit = arr.reduce((accum, num) => num + accum, 0)
        
        let l = minLimit
        let r = maxLimit
        let res = minLimit
        while(l <= r) {
            const mid = l + Math.floor((r - l)/2)
            let cnt = 1
            let sum = 0
            for(let j = 0; j < n; j++) {
                if (sum + arr[j] > mid) {
                    cnt++
                    sum = arr[j]
                } else {
                    sum += arr[j]
                }
            }
            
            if (cnt <= k) {
                r = mid - 1
                res = mid
            } else {
                l = mid + 1
            }
        }
        
        return res
        
        
    }
