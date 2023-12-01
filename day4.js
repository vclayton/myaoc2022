/// Utility functions
const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;

function commonChars(A, B) {
	B = Array.isArray(B) ? B : [B];
	let allCommon = [];
	Array.from(A).forEach((c) => {
		let common = [];
		B.forEach((b) => {
			if (b.indexOf(c) >= 0) {
				common.push(c);
			}
		})
		if (common.length == B.length) {
			allCommon.push(c);
		}
	});
	return allCommon;
}
///

let {sample, input} = require('./input4.js');

function part1(input) {
	let rows = input.trim().split("\n");
	let total = 0;
	let pairs = [];

	for (let i=0; i < rows.length; i++) {
		row = rows[i];
		let [a1, a2, b1, b2] = row.split(/[-,]/).map((n) => parseInt(n));
		let aContains = (a1 <= b1 && a2 >= b2);
		let bContains = (b1 <= a1 && b2 >= a2);
		if (aContains || bContains) {
			console.log('Row', a1, a2, b1, b2, aContains, bContains);
			total++;
		}

	}
	return total;
}

function part2(input) {
	let rows = input.trim().split("\n");
	let total = 0;
	let pairs = [];

	for (let i=0; i < rows.length; i++) {
		row = rows[i];
		let [a1, a2, b1, b2] = row.split(/[-,]/).map((n) => parseInt(n));
		let aContains = (a2 >= b1 && a1 <= b2);
		let bContains = (b2 >= a1 && b1 <= a2);
		if (aContains || bContains) {
			console.log('Row', a1, a2, b1, b2, aContains, bContains);
			total++;
		}

	}
	return total;
}

result = part1(input);
console.log(result);



