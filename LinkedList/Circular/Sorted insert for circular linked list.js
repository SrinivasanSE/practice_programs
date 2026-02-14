// https://www.geeksforgeeks.org/sorted-insert-for-circular-linked-list/

class Solution {
  sortedInsert(head, data) {
    // your code here
    const node = new Node(data);
    // if no head
    if (!head) {
      node.next = node;
      return node;
    }

    let curr = head;

    // at head
    if (curr.data >= data) {
      // we need to insert at the head, so we find the tail and link it with the new head
      while (curr.next != head) {
        curr = curr.next;
      }
      curr.next = node;
      node.next = head;
      return node;
    }
    // after head
    while (curr && curr.next.data < data) {
      if (curr.next === head) {
        break;
      }
      curr = curr.next;
    }

    node.next = curr.next;
    curr.next = node;

    return head;
  }
}

class Solution {
  sortedInsert(head, data) {
    // your code here
    const node = new Node(data);
    if (!head) {
      node.next = node;
      return node;
    }

    let curr = head;

    if (curr.data >= data) {
      // switch the data itself instead of finding the tail
      let temp = curr.data;
      curr.data = node.data;
      node.data = temp;
      node.next = curr.next;
      curr.next = node;
      return curr;
    }

    while (curr && curr.next.data < data) {
      if (curr.next === head) {
        break;
      }
      curr = curr.next;
    }

    node.next = curr.next;
    curr.next = node;

    return head;
  }
}
