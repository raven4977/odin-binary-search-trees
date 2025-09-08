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