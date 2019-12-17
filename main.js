/* eslint-disable indent */
'use strict';
const BinarySearchTree = require('./bst');
let counter = 0;
function main() {
  const BST = new BinarySearchTree();

  // BST.insert(3);
  // BST.insert(1);
  // BST.insert(4);
  // BST.insert(6);
  // BST.insert(9);
  // BST.insert(2);
  // BST.insert(5);
  // BST.insert(7);

  // let nodes = 'EASYQUESTION'.split('');
  let nodes = '1 5 4 3 2 8 7 6 9 8 10'.split(' ').map(x => Number(x));
  /*
       1
        \
         5
        / \
       4   8 
      /   / \
     3   7   9
    /   / \   \ 
   2   6   8   10

  */
  for (let node of nodes) {
    BST.insert(node);
  }
  console.log(findThirdLargest(BST));
  counter = 0;
  console.log(findNthLargest(BST, 3));
}
//4 What does it do
function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}
/* tree takes in a node(t) goes until it finds leaf node
adds up values of all nodes by depth first traversal
time complexity is O(n) as it visits each node once and addition is O(1)
*/

/*
  height of BST:
  function height(node)
  if t is null return 1
  otherwise visit left and right children and return higher value + 1
  O(n) as we have to visit each node to be sure to visit the tallest branch
*/

function height(tree) {
  if (!tree) {
    return 0;
  }
  const left = height(tree.left) + 1;
  const right = height(tree.right) + 1;
  return left > right ? left : right;
}

/*
is BST? (tree)
if this is null return true
if tree.left > this or tree.right < this return false;
return is BST (left) AND is BST (right)
*/

function isBST(tree) {
  if (!tree) return true;
  if (tree.left.key > tree.key || tree.right.key < tree.key) return false;
  return isBST(tree.left) && isBST(tree.right);
}

/*
find 3rd largest node:
largest node is rightmost
second largest node is parent of largest node (if present) or left child (if rightmost node is root)
third largest node is therefore left child of second largest node (if it exists) or parent of second largest node
*/

function findThirdLargest(tree) {
  //run time proportional to depth of rightmost node (or it's left child's rightmost subnode), which is log(n) on average (plus looking at a fixed handful of other nodes)
  let prev = null; //keep track of current node's parent
  //traverse down to parent of largest node
  while (tree.right && tree.right.right) {
    prev = tree;
    tree = tree.right;
  }
  //if largest node has a left subtree with at least two elements, the third largest node is somewhere in that subtree
  if (tree.right.left) {
    let sub = tree.right.left; //we might not
    if (sub.right) {
      while (sub.right) {
        sub = sub.right;
      }
      return sub.key;
    }
    //if left child of rightmost has no right child but does have a left child, that's the third largest
    if (sub.left) return sub.left.key;
    //if only one left child the parent of the largest node is the third largest
    return tree.key;
  }

  //if there is a left sibling of the largest node and we've gotten this far, it's rightmost child is the third largest
  if (tree.left) {
    tree = tree.left;
    while (tree.right) {
      tree = tree.right;
    }
    return tree.key;
  }
  if (prev) return prev.key; //if we've gotten this far, grandparent of rightmost is third largest (if it exists)

  //if largest node has no left subtree and no left sibling and no grandparent, tree has at most two elements

  throw new Error('Tree must have at least three nodes');
}
function findNthLargest(tree, n = 3, root = true) {
  if (!tree) return null;
  console.log(tree.key);
  let right = findNthLargest(tree.right, n, false);
  let arr = [];
  if (Array.isArray(right)) {
    if (right.length >= n) return right[n - 1];
    arr = [...right];
  } else if (right !== null) {
    return right;
  }
  arr = [...arr, tree.key];
  let left = findNthLargest(tree.left, n, false);
  if (Array.isArray(left)) {
    arr = [...arr, ...left];
  } else if (left !== null) {
    return left;
  }
  console.log(arr);
  if (arr.length >= n) return arr[n - 1];
  if (!root) return arr;
  throw new Error('Tree must have at least three nodes');
}

main();
