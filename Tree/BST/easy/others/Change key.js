// https://www.geeksforgeeks.org/how-to-implement-decrease-key-or-change-key-in-binary-search-tree/



class node 
{ 
		constructor() {
			this.key = 0;
			this.left = null;
			this.right = null;
		}
	}
var root = null;

// A utility function to 
// create a new BST node 
function newNode(item) 
{ 
	var temp = new node(); 
	temp.key = item; 
	temp.left = null;
	temp.right = null; 
	return temp; 
} 

// A utility function to 
// do inorder traversal of BST 
function inorder( root) 
{ 
	if (root != null) 
	{ 
		inorder(root.left); 
		document.write(root.key + " "); 
		inorder(root.right); 
	} 
} 

/* A utility function to insert 
a new node with given key in BST */
function insert( node , key) 
{ 
	/* If the tree is empty, return a new node */
	if (node == null) return newNode(key); 

	/* Otherwise, recur down the tree */
	if (key < node.key) 
		node.left = insert(node.left, key); 
	else
		node.right = insert(node.right, key); 

	/* return the (unchanged) node pointer */
	return node; 
} 

/* Given a non-empty binary search tree, 
return the node with minimum key value 
found in that tree. Note that the entire 
tree does not need to be searched. */
function minValueNode( Node) 
{ 
	var current = Node; 

	/* loop down to find the leftmost leaf */
	while (current.left != null) 
		current = current.left; 

	return current; 
} 

/* Given a binary search tree and 
a key, this function deletes the key 
and returns the new root */
function deleteNode( root , key) 
{ 
	// base case 
	if (root == null) return root; 

	// If the key to be deleted is 
	// smaller than the root's key, 
	// then it lies in left subtree 
	if (key < root.key) 
		root.left = deleteNode(root.left, key); 

	// If the key to be deleted is 
	// greater than the root's key, 
	// then it lies in right subtree 
	else if (key > root.key) 
		root.right = deleteNode(root.right, key); 

	// if key is same as root's 
	// key, then This is the node 
	// to be deleted 
	else
	{ 
		// node with only one child or no child 
		if (root.left == null) 
		{ 
			temp = root.right; 
			return temp; 
		} 
		else if (root.right == null) 
		{ 
			temp = root.left; 
			return temp; 
		} 

		// node with two children: Get 
		// the inorder successor (smallest 
		// in the right subtree) 
		var temp = minValueNode(root.right); 

		// Copy the inorder successor's 
		// content to this node 
		root.key = temp.key; 

		// Delete the inorder successor 
		root.right = deleteNode(root.right, temp.key); 
	} 
	return root; 
} 

// Function to decrease a key 
// value in Binary Search Tree 
function changeKey( root , oldVal , newVal) 
{ 
	// First delete old key value 
	root = deleteNode(root, oldVal); 

	// Then insert new key value 
	root = insert(root, newVal); 

	// Return new root 
	return root; 
} 


