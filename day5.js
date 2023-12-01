/// Utility functions
const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;
///

let {sample, input} = require('./input5.js');

function parse(input) {
	let stacks = [];
	let moves = [];
	let rows = input.split("\n");
	for (const row of rows) {
		let move = row.match(/move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/);
		if (move) {
			moves.push(move.groups);
		} else {
			//let stack = Array.from(row.matchAll(/(\[\a\]\s)|(\s\s\s\s)/g));
			let stackMatch = row.matchAll(/([A-Z])/g);
			for (const match of stackMatch) {
				console.log(match.index, match[0], match[1]);
				let s = (match.index-1)/4;
				if (!Array.isArray(stacks[s])) {
					stacks[s] = [];
				}
				stacks[s].push(match[0]);
			}
		}
	}

	return {
		stacks: stacks.map(s => s.reverse()),
		moves
	};
}

function part1(input) {
	let stacks = input.stacks;
	for (const move of input.moves) {
		console.log(move);
		for (let c = 0; c < parseInt(move.count); c++) {
			let from = parseInt(move.from),
				to = parseInt(move.to);
			console.log('Moving from,to: ', from, to);
			stacks[to-1].push(stacks[from-1].pop());
		}
	}
	console.log(stacks);

	return stacks.map(s => s.pop());
}

function part2(input) {
	let stacks = input.stacks;
	for (const move of input.moves) {
		console.log(move);
		let from = parseInt(move.from),
			to = parseInt(move.to),
			count = parseInt(move.count);
		console.log('Moving from,to: ', count, from, to);
		stacks[to-1] = stacks[to-1].concat(stacks[from-1].splice(-move.count));
	}
	console.log(stacks);

	return stacks.map(s => s.pop());
}

let parsed = parse(sample);
console.log(parsed);

//result = part2(parsed).join('');
//console.log(result);



