875. Koko Eating Bananas.js

l = 1, r = Math.max(piles), move left if possible, return l

isPossible logic

totalHours += Math.ceil(pile/k)
totalHours <= h

1482. Minimum Number of Days to Make m Bouquets.js

l = min(bloomDay), r = max(bloomDay), move left if possible, return l

isPossible logic

if (currItem <= mid) count++
else total += Math.floor(count / k), count = 0

At the end also, total += Math.floor(count / k)
total >= m


1283. Find the Smallest Divisor Given a Threshold

Similar to Koko problem


1011. Capacity To Ship Packages Within D Days

l = min(arr), r = max(arr), move left if possible, return l

isPossible logic

Start the count with 1, if the sum + weight > mid, set the sum as curr weight and increment the count.
else do sum += weight

count <= days

------------------------------------------------------ Min Max -------------------------------------------------------------

Aggressive Cows

Sort the given arr

l = 1, r = arr[n - 1] - arr[0], move right if possible, return r

isPossible logic

Start the count with 1 and track the last placed cow index, start with 0.
If (arr[i] - arr[last] >= mid), update last to the curr index and track the count

count >= k


Allocate Minimum Pages, Split array - largest sum, Painter's Partition

l = max(arr), r = sum(arr), move left is possible, return l

isPossible logic

Start the count with 1 and sum as first book
If (sum + arr[i] > mid) do count++ and sum as arr[i]
else do sum += arr[i]

count <= k




