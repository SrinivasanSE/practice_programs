// https://leetcode.com/problems/word-search/description/

/*

Let's analyze the **Time Complexity (TC)** and **Space Complexity (SC)** for the optimized Word Search solution with pruning:

---

## **Time Complexity (TC)**

### **1. Frequency Pruning**
- Counting all letters in the board:  
  **O(m × n)** (where m = rows, n = columns)

- Checking word letter frequencies:  
  **O(L)** (where L = length of word)

### **2. Main DFS Search**
- In the worst case, for each cell in the board, we may start a DFS.
- For each DFS, the recursion can go as deep as the length of the word (**L**).
- At each step, we can move in up to 4 directions.

#### **Worst Case (No Pruning)**
- Each cell: O(m × n)
- Each DFS path: up to 4^L (since each letter can branch up to 4 directions, but not revisiting cells)
- So, **O(m × n × 4^L)**

#### **With Pruning**
- **Frequency pruning** and **directional optimization** can greatly reduce the number of DFS starts and unnecessary branches, but in the worst case, the complexity remains **O(m × n × 4^L)**.

---

## **Space Complexity (SC)**

### **1. Frequency Table**
- O(1) for English alphabet (since boardFreq only stores character counts)

### **2. Recursion Stack**
- The maximum depth of recursion is the length of the word (**L**).
- So, **O(L)** for the call stack.

### **3. Board Modification**
- We mark cells as visited in-place, so no extra space is needed for a visited array.

---

## **Summary Table**

| Step                  | Complexity      |
|-----------------------|----------------|
| Frequency Pruning     | O(m × n + L)   |
| DFS Search (Worst)    | O(m × n × 4^L) |
| Recursion Stack       | O(L)           |
| BoardFreq Table       | O(1)           |

---

## **Final Answer**

- **Time Complexity:**  
  **O(m × n × 4^L)**  
  (where m = rows, n = columns, L = length of word)

- **Space Complexity:**  
  **O(L)** (recursion stack)

---

**Note:**  
Pruning and directional optimization make the algorithm much faster in practice, but the theoretical worst case remains exponential due to the nature of DFS with branching.

Let me know if you want a more detailed breakdown or have follow-up questions!

*/

var exist = function (board, word) {
    const rows = board.length
    const cols = board[0].length
    const n = word.length
    const boardFreq = {}
    // frequency check
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            boardFreq[board[r][c]] = (boardFreq[board[r][c]] || 0) + 1
        }
    }

    for (let char of word) {
        if (!boardFreq[char]) return false
        boardFreq[char]--
    }

    // if the frequency of first element is greater, that means we might have many starting points, so we start with the least freq char
    if (boardFreq[word[0]] > boardFreq[word[n - 1]]) {
        word = word.split("").reverse().join("")
    }

    const dfs = (r, c, i) => {
        if (i === n) {
            return true
        }

        if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] != word[i]) {
            return false
        }

        const temp = board[r][c]
        board[r][c] = "#" // we mark as visited so that we don't use it again, ABCB, we might again backtrack and use the already used B which is wrong

        let isFound = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1)
            || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1)

        board[r][c] = temp

        return isFound
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === word[0] && dfs(r, c, 0)) return true // we run the dfs only when the first element matches
        }
    }
    return false
};