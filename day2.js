let {sample, input} = require('./input2.js');

// A: Rock, B: Paper, C: Scissors
// X: Rock, Y: Paper, C: Scissors

const points = {
	'A X': 3 + 1,
	'A Y': 6 + 2,
	'A Z': 0 + 3,
	'B X': 0 + 1,
	'B Y': 3 + 2,
	'B Z': 6 + 3,
	'C X': 6 + 1,
	'C Y': 0 + 2,
	'C Z': 3 + 3,
};

const points2 = {
	X: 0, // Lose
	Y: 3, // Draw
	Z: 6, // Win
	'A X': 0 + 3, // Scissor loses to rock
	'B X': 0 + 1, // Rock loses to paper
	'C X': 0 + 2, // Paper loses to scissors
	'A Y': 3 + 1,
	'B Y': 3 + 2,
	'C Y': 3 + 3,
	'A Z': 6 + 2,
	'B Z': 6 + 3,
	'C Z': 6 + 1,
};

function part1(input) {
	let rows = input.trim().split("\n");
	let total = 0;

	for (let i=0; i < rows.length; i++) {
		console.log('Row', rows[i], ' Points=', points[rows[i]]);
		total += points[rows[i]];
	}
	return total;
}

function part2(input) {
	let rows = input.trim().split("\n");
	let total = 0;

	for (let i=0; i < rows.length; i++) {
		console.log('Row', rows[i], ' Points=', points2[rows[i]]);
		total += points2[rows[i]];
	}
	return total;
}

const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;

result = part2(sample);

/*

let data = parse(sample);
data.sort((a, b) => a.total - b.total);
console.log(data);
let totals = data.map(e => e.total);
let result = totals.slice(-3);

//totals.sort(numSort);
*/
console.log(result);
//console.log(result.reduce(sum, 0));
