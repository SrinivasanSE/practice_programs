// https://www.geeksforgeeks.org/alternating-split-of-a-given-singly-linked-list/

class Solution {
  append(dest, source) {
    const node = new Node(source.data);
    let last = dest[0];
    if (!last) {
      dest[0] = node;
    } else {
      while (last.next) {
        last = last.next;
      }
      last.next = node;
    }
  }
  alternatingSplitList(head) {
    // code here
    let a = [],
      b = [];
    let curr = head;

    while (curr) {
      this.append(a, curr);
      curr = curr.next;
      if (curr) {
        this.append(b, curr);
        curr = curr.next;
      }
    }

    return [a[0], b[0]];
  }
}

class Solution {
  alternatingSplitList(head) {
    // code here
    let head1 = null,
      head2 = null,
      first = null,
      second = null;
    let curr = head,
      i = 0;
    while (curr) {
      if (i % 2 === 0) {
        if (!head1) {
          head1 = curr;
          first = curr;
        } else {
          first.next = curr;
          first = first.next;
        }
      } else {
        if (!head2) {
          head2 = curr;
          second = curr;
        } else {
          second.next = curr;
          second = second.next;
        }
      }
      i++;
      curr = curr.next;
    }
    if (first) first.next = null;
    if (second) second.next = null;
    return [head1, head2];
  }
}
