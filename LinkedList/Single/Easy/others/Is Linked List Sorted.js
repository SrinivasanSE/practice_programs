// https://www.geeksforgeeks.org/problems/is-linked-list-sorted/1?page=2&category=Linked%20List&difficulty=Easy&sortBy=submissions

class Solution {
  isSorted(head) {
    //code here
    if (!head.next) {
      return true;
    }

    let slow = head;
    let fast = head.next;
    let isAsc = true;

    let isDesc = true;
    while (fast) {
      if (slow.data < fast.data) {
        isDesc = false;
      } else if (slow.data > fast.data) {
        isAsc = false;
      }

      if (!isAsc && !isDesc) {
        return 0;
      }

      slow = fast;
      fast = fast.next;
    }
    return 1;
  }
}

// this program works because the numbers will be either increasing or decreasing, but not like 9, 8, 11 and will work for 9 7 8 (not in correct order, but it's decreasing)
class Solution {
  isSorted(head) {
    //code here
    if (!head.next) {
      return true;
    }

    let slow = head;
    let fast = head.next;
    let diff;
    let counter = 0;
    while (fast) {
      diff = slow.data - fast.data;
      if (Math.abs(counter + diff) < Math.abs(counter)) return 0; // if the curr diff is greater than the previous diff + curr, that means the direction has changed, asc to desc or desc to asc.
      counter = diff;

      slow = fast;
      fast = fast.next;
    }
    return 1;
  }
}
