# https://www.geeksforgeeks.org/count-indices-with-specific-frequency-in-array-range/

class Solution:
    def solveQueries(self, N : int, num : int, A : List[int], Q : List[List[int]]) -> List[int]:
        # code here
        res = []
        hashmap = {}
        
        for i in range(N):
            count = 0
            for j in range(i, N):
                
                if A[i] == A[j]:
                    count+=1
                    
            hashmap[i] = count
                
        for i in range(num):
            l,r,k = Q[i]
            count = 0
            for i in range(l, r + 1):
                if hashmap[i] == k:
                    count+=1
            res.append(count)
            
        return res