/* eslint-disable indent */
'use strict';
const BinarySearchTree = require('./bst');

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
	let nodes = '154328769'.split('');
	for (let node of nodes) {
		BST.insert(node);
	}
	console.log(findThirdLargest(BST));
	console.log(isBalancedBST(BST));
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

/* 
  checks if BST is balanced
  no 2 leaves differ in dist from root by >1
  function isBalancedBST(node, count = 0)
  create left and right then traverse each counting nodes
  find difference between left and right
  if > than 1 then it's false
*/
function isBalancedBST(node, count = 0) {
	if (!node) {
		return count; //0
	}
	if (node !== null) {
		count++;
		let l = 0;
		let r = 0;
		//traverses right and counts how many nodes
		r = isBalancedBST(node.right, count);
		if (r === false) {
			return false;
		}
		//traverses left and counts how many nodes
		l = isBalancedBST(node.left, count);
		if (l === false) {
			return false;
		}
		//abs value of difference between left and right and checks to see if
		//left or right is > 1 or not
		return Math.abs(l - r) > 1 ? false : true;
	}
}

main();
