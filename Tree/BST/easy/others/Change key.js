// https://www.geeksforgeeks.org/how-to-implement-decrease-key-or-change-key-in-binary-search-tree/

/*

The idea is to call delete for old key value, then call insert for new key value. 

*/

function changeKey(root, oldVal, newVal) {
  // First delete old key value
  root = deleteNode(root, oldVal);

  // Then insert new key value
  root = insert(root, newVal);

  // Return new root
  return root;
}
