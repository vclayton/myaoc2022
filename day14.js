const fs = require('fs');
/// Utility functions
const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;

///

function gridSet(g, x, y, v, range) {
	g[y] = Array.isArray(g[y]) ? g[y] : [];
	g[y][x] = v;
	if (range) {
		range.minX = Math.min(range.minX, x);
		range.maxX = Math.max(range.maxX, x);
		range.minY = Math.min(range.minY, y);
		range.maxY = Math.max(range.maxY, y);
	}
	//console.log('Setting x, y', x, y);
}

function gridGet(g, x, y, floor) {
	let val = Array.isArray(g[y]) ? g[y][x] : null;
	if (floor && !val && y >= floor) {
		val = 1;
	}
	return val;
}

function parse(input) {
	let grid = [];
	let lines = fs.readFileSync(input, 'ascii').trim().split("\n");
	let range = {minX: 500, maxX: 500, minY: 0, maxY: 0};
	lines.forEach((line) => {
		let pairs = line.split(' -> ').map(p => p.split(',').map(i => parseInt(i)));
		console.log(pairs);
		if (!pairs.length) return;
		let [x, y] = pairs.shift()
		while (pairs.length) {
			let dx = Math.sign(pairs[0][0] - x);
			let dy = Math.sign(pairs[0][1] - y);
			//console.log('DX, DY:', dx, dy, x, y, pairs[0]);
			gridSet(grid, x, y, 1, range);
			while(x != pairs[0][0] || y != pairs[0][1]) {
				x += dx;
				y += dy;
				gridSet(grid, x, y, 1, range);
			}
			pairs.shift();
		}
	});
	return { grid, range };
}

function showGraph(grid, range, floor) {
	for (let y = range.minY; y <= Math.max(range.maxY, floor); y++) {
		let line = '';
		for (let x = range.minX; x <= range.maxX; x++) {
			let v = gridGet(grid, x, y, floor);
			line += (v == 1 ? '#' : (v == 2 ? 'o' : '.'));
		}
		console.log(line);
	}
}

function part1(input) {
	let {grid, range} = input;

	showGraph(grid, range);
	let s = 0;
	let fell = true;
	while (fell) {
		let x = 500, y = 0, settled = false;
		while (x >= range.minX && x <= range.maxX && y <= range.maxY+2 && !settled) {
			if (!gridGet(grid, x, y+1)) {
				y++;
			} else if (!gridGet(grid, x-1, y+1)) {
				x--;
				y++;
			} else if (!gridGet(grid, x+1, y+1)) {
				x++;
				y++;
			} else {
				s++;
				gridSet(grid, x, y, 2);
				settled = true;
			}
		}
		fell = settled;
	}
	console.log('Result:');
	showGraph(grid, range);

	return s;
}

function part2(input) {
	let {grid, range} = input;

	let s = 0;
	let full = false;
	let floor = range.maxY + 2;
	showGraph(grid, range, floor);
	while (!full) {
		let x = 500, y = 0, settled = false;
		while (x >= range.minX-1 && x <= range.maxX+1 && y < floor && !settled) {
			if (!gridGet(grid, x, y+1, floor)) {
				y++;
			} else if (!gridGet(grid, x-1, y+1, floor)) {
				x--;
				y++;
			} else if (!gridGet(grid, x+1, y+1, floor)) {
				x++;
				y++;
			} else {
				s++;
				gridSet(grid, x, y, 2, range);
				settled = true;
				full = (x == 500 & y == 0);
				console.log('Settled at x,y:', x, y, full);
			}
		}
		console.log('S: ', s, range);
		//showGraph(grid, range, floor);
	}
	console.log('Result:');
	showGraph(grid, range, floor);

	return s;
}

//console.log(part1(parse("data/sample.14")));
//console.log(part1(parse("data/input.14"))); // Correct: 913
//console.log(part2(parse("data/sample.14")));
console.log(part2(parse("data/input.14"))); // Correct: 30762



