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

let {sample, input} = require('./input3.js');

function priority(c) {
	let offset = c < 'a' ? 38 : 96;
	return  c.charCodeAt(0) - offset;
}

function part1(input) {
	let rows = input.trim().split("\n");
	let total = 0;
	let sacks = [];

	for (let i=0; i < rows.length; i++) {
		row = rows[i];
		let len = row.length;
		let left = row.slice(0,len/2),
			right = row.slice(len/2);
		let commonVal = 0;

		let common = commonChars(left, [right]);
		commonVal = priority(common[0]);

		//console.log('Row', row, left, right, ' Commmon:', common, ' Priority:', commonVal);
		total += commonVal;
	}
	return total;
}

function part2(input) {
	let rows = input.trim().split("\n");
	let total = 0;
	let groups = [];

	for (let i=0; i < rows.length; i++) {
		row = rows[i];
		let len = row.length;
		//let left = row.slice(0,len/2),
		//	right = row.slice(len/2);
		let common = [];
		let commonVal = 0;

		if (i % 3 == 2) {
			let a = rows[i-2],
				b = rows[i-1],
				c = rows[i];
			groups.push([a, b, c]);
			common = commonChars(a, [b, c]);
			commonVal = priority(common[0]);
			//console.log('Group', [a, b, c], ' Commmon:', common, ' Priority:', commonVal);
			total += commonVal;
		}
	}
	return total;
}

console.log(part1(sample));
console.log(part1(input));
console.log(part2(sample));
console.log(part2(input));

/*

let data = parse(sample);
data.sort((a, b) => a.total - b.total);
console.log(data);
let totals = data.map(e => e.total);
let result = totals.slice(-3);

//totals.sort(numSort);
*/
//console.log(result);
//console.log(result.reduce(sum, 0));
