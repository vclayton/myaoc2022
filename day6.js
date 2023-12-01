/// Utility functions
const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;
///

let {sample, sample2, input} = require('./input6.js');

function parse(input) {
	return input.trim();
}

function part1(input) {
	const max = 4;
	let buf = []
	for (let i=0; i<input.length; i++) {
		if (buf.length >= max) {
			buf.shift();
		}
		buf.push(input[i]);
		if (buf.length === max && isUnique(buf)) {
			return i+1;
		}
	}
}

function isUnique(buf) {
	for (let i=0; i<buf.length; i++) {
		let c = buf[i];
		for (j=i+1; j<buf.length; j++) {
			if (buf[j] === c) {
				return false;
			}
		}
	}
	return true;
}

function part2(input) {
	const max = 14;
	let buf = []
	for (let i=0; i<input.length; i++) {
		if (buf.length >= max) {
			buf.shift();
		}
		buf.push(input[i]);
		if (buf.length === max && isUnique(buf)) {
			return i+1;
		}
	}
}

sample.map(s => console.log(s, part1(parse(s))));
input.map(s => console.log(s, part1(parse(s))));
sample2.map(s => console.log(s, part2(parse(s))));
input.map(s => console.log(s, part2(parse(s))));


