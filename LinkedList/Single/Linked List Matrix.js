// https://www.geeksforgeeks.org/construct-linked-list-2d-matrix/


class Solution {
    constructLinkedMatrix(mat) {
        let n = mat.length;
        if (n === 0) return null;

        let nodes = Array.from({ length: n }, () => Array(n));

        // Create nodes for each matrix element
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                nodes[i][j] = new Node(mat[i][j]);
                if (j > 0) nodes[i][j - 1].right = nodes[i][j]; // Link left to right
                if (i > 0) nodes[i - 1][j].down = nodes[i][j];  // Link top to bottom
            }
        }

        return nodes[0][0]; // Return the head node
    }
}

class Solution {
    constructLinkedMatrix(mat) {
        // code here
        let n = mat.length
        let m = mat[0].length
        let head = null
        let prev = null
        for(let i = 0; i < n; i++) {
            let curr = null
            let temp = null
            for(let j = 0; j < m; j++) {
                //console.log(mat[i][j])
                const node = new Node(mat[i][j])
                if(!temp) {
                    temp = node
                }
                if(!head) {
                    head = node
                } 
                if(curr) {
                    curr.right = node
                    //console.log(curr)
                }
                if(prev) {
                    prev.down = node
                    prev = prev.right
                }
                curr = node
                //console.log(curr)
            }
            
            prev = temp
            //console.log(prev, temp)
            
        }
        
        return head
    }
}
