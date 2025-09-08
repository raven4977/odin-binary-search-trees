class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(sortArray(array));
  }

  insert(current = this.root, value) {
    if (!current) {
      return new Node(value);
    }

    if (current.data === value) {
      return current;
    }

    if (value < current.data) {
      current.left = this.insert(current.left, value);
    } else if (value > current.data) {
      current.right = this.insert(current.right, value);
    }
    return current;
  }

  deleteItem(value) {}
}

function buildTree(array, start = 0, end = array.length - 1) {
  if (start > end) return null;
  let mid = start + Math.floor((end - start) / 2);
  let root = new Node(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);
  return root;
}

function sortArray(array) {
  return [...new Set(array)].sort((a, b) => a - b);
}

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

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

const testArr = [0, 1, 2, 3, 4, 5, 6, 7];

tree.insert(tree.root, 14);

prettyPrint(tree.root);

// tree.deleteItem();

const test = new Tree(testArr);
// prettyPrint(test.root);
