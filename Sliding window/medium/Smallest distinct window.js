// https://www.geeksforgeeks.org/smallest-window-contains-characters-string/


function findSubString(str) {
    let n = str.length;

    let visited = new Array(26).fill(false);
    let distinct = 0;

    for (let i = 0; i < n; i++) {
        if (visited[str.charCodeAt(i) - 97] == false) {
            visited[str.charCodeAt(i) - 97] = true;
            distinct++;
        }
    }
    
    let cur = new Array(26).fill(0);
    let cnt = 0;

    let ans = n;
    let start = 0;
    for (let end = 0; end < n; end++) {
        cur[str.charCodeAt(end) - 97]++;

        if (cur[str.charCodeAt(end) - 97] == 1) {
            cnt++;
        }
        while (cnt == distinct) {
            ans = Math.min(ans, end - start + 1);
            cur[str.charCodeAt(start) - 97]--;
            if (cur[str.charCodeAt(start) - 97] == 0) {
                cnt--;
            }
            start++;
        }
    }
    return ans;
}