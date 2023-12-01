const fs = require('fs');

/// Utility functions
const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;
///


let head = [0, 0],
	tail = [0, 0],
	tailMap = {};

function parse(input) {
	let lines = fs.readFileSync(input, 'ascii').trim().split("\n");
	let ops = [];
	lines.forEach((line, y) => {
		[op, arg] = line.split(" ");
		ops.push([op, parseInt(arg)]);
	});
	return ops;
}

let crt = [];

function tick(cycle, x) {
	let scan = (cycle-1) % 40;
	if (Math.abs(x-scan) < 2) {
		crt.push('#');
	} else {
		crt.push('.');
	}
}

function arrayChunk(arr, len) {
	var chunks = [],
		i = 0,
		n = arr.length;

	while (i < n) {
		chunks.push(arr.slice(i, i += len));
	}

	return chunks;
}

function part1(moves) {
	let cycle = 1;
	let x = 1;
	let signal = [1];
	crt = [];
	let scan = 0;

//	show();
	moves.forEach(([op, arg]) => {
		console.log(`Cycle ${cycle} x=${x}  op ${op} arg ${arg}`);
		if (op === 'noop') {
			signal[cycle] = cycle * x;
			tick(cycle, x);
			cycle++;
		} else {
			signal[cycle] = cycle * x;
			tick(cycle, x);
			cycle++;
		console.log(`Cycle ${cycle} x=${x}  op ${op} arg ${arg}`);
			signal[cycle] = cycle * x;
			tick(cycle, x);
			cycle++;
			x += arg;
		}
	});
	console.log(`END Cycle ${cycle} x=${x}  op ${op} arg ${arg}`);
	let signals = signal.filter((e, i) => (i+20) % 40 == 0);
	console.log(signals);
	console.log(arrayChunk(crt, 40).map(c => c.join('')));
	return signals.reduce(sum);
}


function part2(moves) {
}

//console.log(part1(parse("data/sample2.10")));
//console.log(part1(parse("data/sample.10")));
console.log(part1(parse("data/input.10")));
//console.log(part2(parse("data/sample2.10")));
//console.log(part2(parse("data/input.10")));

