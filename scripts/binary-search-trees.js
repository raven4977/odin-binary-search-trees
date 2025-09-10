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
    if (!this.root) {
      this.root = new Node(value);
      return this.root;
    }

    let parent = null;
    while (current) {
      parent = current;
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return current;
      }
    }
    if (parent.data > value) {
      parent.left = new Node(value);
    } else {
      parent.right = new Node(value);
    }
    return this.root;
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
      current.right = this.deleteItem(succ.data, current.right);
    }
    return current;
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr && curr.left) {
      curr = curr.left;
    }
    return curr;
  }

  find(value) {
    let current = this.root;
    while (current) {
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return current;
      }
    }
    return null;
  }
  levelOrderForEach(callback, current = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!current) return;
    const queue = [];
    queue.push(current);
    while (queue.length > 0) {
      current = queue[0];
      callback(current);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      queue.shift();
    }
  }
  inOrderForEach(callback, current = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!current) return;
    this.inOrderForEach(callback, current.left);
    callback(current);
    this.inOrderForEach(callback, current.right);
  }
  preOrderForEach(callback, current = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!current) return;
    callback(current);
    this.preOrderForEach(callback, current.left);
    this.preOrderForEach(callback, current.right);
  }
  postOrderForEach(callback, current = this.root) {
    if (!callback) throw new Error("Callback required");
    if (!current) return;
    this.postOrderForEach(callback, current.left);
    this.postOrderForEach(callback, current.right);
    callback(current);
  }
  depth(value, current = this.root, depth = 0) {
    if (!current) return;
    if (current.data === value) return depth;
    depth++;
    if (value > current.data) return this.depth(value, current.right, depth);
    return this.depth(value, current.left, depth);
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

const tree = new Tree(array);

tree.insert(8);

tree.deleteItem(8);

tree.insert(10);

tree.insert(11);

// console.log(tree.find(11));

// tree.levelOrderForEach((node) => console.log(node));

// tree.preOrderForEach((node) => console.log(node));

// tree.inOrderForEach((node) => console.log(node));

// tree.postOrderForEach((node) => console.log(node));

console.log(tree.depth(1));

console.log(tree);

prettyPrint(tree.root);
