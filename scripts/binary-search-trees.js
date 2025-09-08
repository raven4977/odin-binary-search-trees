class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = buildTree(arr, 0, arr.length - 1);
  }

  insert(value) {
    let current = this.root;
    while (current) {
      if (value > current.data) {
        if (!current.right) {
          current.right = new Node(value);
          return;
        }
        current = current.right;
      }
      if (value < current.data) {
        if (!current.left) {
          current.left = new Node(value);
          return;
        }
        current = current.left;
      }
    }
  }
  deleteItem(value, current = this.root) {
    if (!current) {
      return current;
    }
    if (current.data > value) {
      current.left = this.deleteItem(value, current.left);
    } else if (current.data < value) {
      current.right = this.deleteItem(value, current.right);
    } else {
      if (!current.left) return current.right;
      if (!current.right) return current.left;
      let succ = this.getSuccessor(current);
      current.data = succ.data;
      current.right = this.deleteItem(current.right, succ.data);
    }
    return current;
  }
  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }
}

function buildTree(arr, start, end) {
  if (start > end) return null;
  const mid = start + Math.floor((end - start) / 2);
  const root = new Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}

const array = [1, 2, 3, 4, 5, 6, 7];

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
