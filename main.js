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

	let nodes = 'EASYQUESTION'.split('');

	for (let node of nodes) {
		BST.insert(node);
	}
	console.log(BST);
}
//4 What does it do
function tree(t) {
	if (!t) {
		return 0;
	}
	return tree(t.left) + t.value + tree(t.right);
}
/* tree takes in a node(t) goes until it finds leaf node
adds up values of all nodes by depth first traversal */
main();
