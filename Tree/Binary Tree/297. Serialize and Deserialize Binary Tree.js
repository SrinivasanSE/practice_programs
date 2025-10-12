// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/


// Using BFS

var serialize = function (root) {
    let str = ""
    if (root == null) return str
    const q = [root]
    while (q.length > 0) {
        const node = q.shift()

        if (!node) str += ",#"
        else {
            if (str)
                str += "," + node.val
            else
                str += node.val
        }

        if (node) {
            q.push(node.left)
            q.push(node.right)
        }

    }

    return str

};

var deserialize = function (data) {
    if (!data) return null
    data = data.split(",")
    const root = new TreeNode(+data[0])
    const q = [root]
    let i = 1
    while (q.length > 0) {
        const node = q.shift()

        if (data[i] != "#") {
            node.left = new TreeNode(+data[i])
            q.push(node.left)
        }

        i += 1

        if (data[i] != "#") {
            node.right = new TreeNode(+data[i])
            q.push(node.right)
        }

        i += 1
    }

    return root
};


// Using Preorder


var serialize = function (root) {
    let str = ""
    if (root == null) return str
    
    const preOrder = (node) => {
        if (!node) {
            str += ",N"
            return
        }
        if (str) {
            str += "," + node.val
        } else {
            str += node.val
        }
        preOrder(node.left)
        preOrder(node.right)
    }
    preOrder(root)
    return str

};


var deserialize = function (data) {
    if (!data) return null
    const values = data.split(",")
    let index = 0
    const buildTree = () => {
        if (values[index] === "N") {
            index++
            return null
        }

        const node = new TreeNode(parseInt(values[index]))
        index++
        node.left = buildTree()
        node.right = buildTree()

        return node
    }
    
    return buildTree()
};


// Using Postorder


var serialize = function(root) {
    const result = [];

    const postorder = (node) => {
        if (!node) {
            result.push("N");
            return;
        }
        postorder(node.left);
        postorder(node.right);
        result.push(node.val);
    };

    postorder(root);
    return result.join(",");
};

// Deserialize using Postorder
var deserialize = function(data) {
    if (!data) return null;

    const values = data.split(",");
    let index = values.length - 1; // start from the end

    const buildTree = () => {
        if (values[index] === "N") {
            index--;
            return null;
        }

        const node = new TreeNode(parseInt(values[index]));
        index--;

        // Important — build right first, then left
        node.right = buildTree();
        node.left = buildTree();

        return node;
    };

    return buildTree();
};