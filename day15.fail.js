const fs = require('fs');
/// Utility functions
const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;

///

function gridSet(g, x, y, v, range) {
	g[y] = typeof g[y] == 'object' ? g[y] : {};
	g[y][x] = g[y][x] ? Math.max(v, g[y][x]) : v;
	if (range) {
		rangeSet(range, x, y);
	}
	//console.log('Setting x, y', x, y);
}

function rangeSet(range, x, y) {
	range.minX = Math.min(range.minX, x);
	range.maxX = Math.max(range.maxX, x);
	range.minY = Math.min(range.minY, y);
	range.maxY = Math.max(range.maxY, y);
}

function gridGet(g, x, y, floor) {
	let val = typeof g[y] == 'object' ? g[y][x] : null;
	if (floor && !val && y >= floor) {
		val = 1;
	}
	return val;
}

function manhattanDistance(a, b) {
	var d1 = Math.abs(b.x - a.x);
	var d2 = Math.abs(b.y - a.y);
	return d1 + d2;
}

function parse(input) {
	let grid = [];
	let lines = fs.readFileSync(input, 'ascii').trim().split("\n");
	let range = {minX: 0, maxX: 0, minY: 0, maxY: 0};
	lines.forEach((line) => {
		let parts = line.split(/[ =,:]/);
		let s = {x:parseInt(parts[3]), y:parseInt(parts[6])};
		let b = {x:parseInt(parts[13]), y:parseInt(parts[16])};
		let d = manhattanDistance(s, b);
		console.log(s, b, d);
		rangeSet(range, s.x-d, s.y-d);
		rangeSet(range, s.x+d, s.y+d);

		gridSet(grid, s.x, s.y, 2, range);
		gridSet(grid, b.x, b.y, 3, range);
		// Fill in
		for (i=1; i<=d; i++) {
			for (let j=0; j<=i; j++) {
				gridSet(grid, s.x-i+j, s.y-j, 1, range);
				gridSet(grid, s.x+i-j, s.y+j, 1, range);
				gridSet(grid, s.x-i+j, s.y+j, 1, range);
				gridSet(grid, s.x+i-j, s.y-j, 1, range);
			}
		}
	});
	return { grid, range };
}

function showGraph(grid, range) {
	const chrs = {2: 'S', 3:'B', 1:'#'};
	for (let y = range.minY; y <= Math.max(range.maxY); y++) {
		let line = '';
		for (let x = range.minX; x <= range.maxX; x++) {
			let v = gridGet(grid, x, y);
			line += v ? chrs[v]  : '.';
		}
		console.log(line);
	}
}

function part1(input, row) {
	let {grid, range} = input;

	console.log('Hey', range);
	showGraph(grid, range);
//	console.log('Hey', Object.values(grid[row]));

	// It's an object because of negative indexes
	let pCount = Object.values(grid[row]).reduce((a, val, i) => {
		return val==1 ? a+1 : a;
	}, 0);
	return pCount;
}

function part2(input, row) {
	let {grid, range} = input;

}

console.log(part1(parse("data/sample.15"), 10));
//console.log(part1(parse("data/input.15"), 2000000)); //
//console.log(part2(parse("data/sample.15")));
//console.log(part2(parse("data/input.15"))); //



