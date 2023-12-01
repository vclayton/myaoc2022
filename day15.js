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
	let val = null;
	let pt = {x, y};
	if (g.b.some(b => b.x == x && b.y == y)) {
		return 3;
	}
	if (g.s.some(b => b.x == x && b.y == y)) {
		return 2;
	}
	for (let i=0; i<g.s.length; i++) {
		let d = manhattanDistance(pt, g.s[i]);
		if (d <= g.s[i].d) {
			//let r = {v:1, skipX: g.s[i].d - Math.abs(pt.y - g.s[i].y)};
			let r = {v:1, skipX: g.s[i].d - d};
			//console.log(r);
			return r;
		}
	}
	return null;
}

function manhattanDistance(a, b) {
	var d1 = Math.abs(b.x - a.x);
	var d2 = Math.abs(b.y - a.y);
	return d1 + d2;
}

function parse(input) {
	let grid = {
		s:[],
		b:[]
	};
	let lines = fs.readFileSync(input, 'ascii').trim().split("\n");
	let range = {minX: 0, maxX: 0, minY: 0, maxY: 0};
	lines.forEach((line) => {
		let parts = line.split(/[ =,:]/);
		let s = {x:parseInt(parts[3]), y:parseInt(parts[6])};
		let b = {x:parseInt(parts[13]), y:parseInt(parts[16])};
		let d = manhattanDistance(s, b);
		s.d = d;
		grid.s.push(s);
		grid.b.push(b);
		console.log(s, b, d);
		rangeSet(range, s.x-d, s.y-d);
		rangeSet(range, s.x+d, s.y+d);
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
//	showGraph(grid, range);
//	console.log('Hey', Object.values(grid[row]));

	// It's an object because of negative indexes
	let gridRow = [];
	for (let x=range.minX; x<=range.maxX; x++) {
		gridRow.push(gridGet(grid, x, row));
	}
	console.log(gridRow);
	let pCount = gridRow.reduce((a, val, i) => {
		return val==1 ? a+1 : a;
	}, 0);
	return pCount;
}

function part2(input, size) {
	let {grid, range} = input;

	console.log('Hey', range);
	range.minX = Math.max(range.minX, 0);
	range.minY = Math.max(range.minY, 0);
	range.maxX = Math.min(range.maxX, size);
	range.maxY = Math.min(range.maxY, size);
	console.log('Search', range);
	//showGraph(grid, range);
//	console.log('Hey', Object.values(grid[row]));

	let t=0;
	for(let y=0; y<size; y++) {
		console.log('Searching row ', y);
		for(let x=0; x<size; x++) {
			let v = gridGet(grid, x, y);
			if (!v) {
				let freq = x*4000000+y;
				console.log('Found at x,y,freq,time:', x, y, freq, t);
				return freq;
			} else if (v.skipX) {
				x += Math.max(v.skipX, 0);
			}
			t++;
		}
	}
}

//console.log(part1(parse("data/sample.15"), 10));
//console.log(part1(parse("data/input.15"), 2000000)); // Correct: 4985193
//console.log(part2(parse("data/sample.15"), 20));
console.log(part2(parse("data/input.15"), 4000000)); // Found at x,y,freq,time: 2895970 2601918 11583882601918 29487467. Correct: 11583882601918



