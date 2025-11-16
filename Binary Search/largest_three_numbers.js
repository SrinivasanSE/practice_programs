// https://www.geeksforgeeks.org/find-the-largest-three-elements-in-an-array/
// https://www.geeksforgeeks.org/to-find-smallest-and-second-smallest-element-in-an-array/
// https://www.geeksforgeeks.org/find-second-largest-element-array/
// https://www.geeksforgeeks.org/program-to-find-largest-element-in-an-array/

const getThreeLargest = (arr) => {
        let n = arr.length
        let m1 = -1,m2 = -1,m3 = -1
        for(let i = 0; i <n; i++ ) {
            //console.log(arr[i], m1, m2, m3)
            if(m1 < arr[i]) {
                m3 = m2
                m2 = m1
                m1 = arr[i]
                
            } else if(arr[i] > m2 && m1 > arr[i] ) {
                m3 = m2
                m2 = arr[i]
            } else if(arr[i] > m3 && m2 > arr[i] && m1 > arr[i]) {
                m3 = arr[i]
            }
        }
        
        let res = [m1]
        if (m2 > 0) {
            res.push(m2)
        }
        if (m3 > 0) {
            res.push(m3)
        }
        return res
}

let arr = [12, 13, 1, 10, 34, 1];
let res = getThreelargest(arr);
console.log(res.join(' '));
