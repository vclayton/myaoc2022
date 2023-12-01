const fs = require('fs');

/// Utility functions
const numSort = (a, b) => a - b;
///

function parse(input) {
	let lines = fs.readFileSync(input, 'ascii').trim().split("\n");
	let grid = [];
	lines.forEach((line, y) => {
		line.split("").forEach((chr, x) => {
			grid[y] = Array.isArray(grid[y]) ? grid[y] : [];
			grid[y][x] = {h: parseInt(chr), l:-1, t:-1, r:-1, b:-1, v: 1}; // Height, tallest seen from each dir, visible
		});
	});
	return grid;
}

// Original implementation, good enough for part1
function oldScanVisibility(input) {
	// Scan for visibility from the left
	for (let y=0; y<input.length; y++) {
		let tallest = input[y][0].h;
		for (let x=1; x<input[y].length; x++) {
			input[y][x].l = tallest;
			input[y][x].v = input[y][x].h > tallest ? 1 : 0;
			tallest = Math.max(tallest, input[y][x].h);
		}
	}
	// Scan for visibility from the right
	for (let y=0; y<input.length; y++) {
		let tallest = input[y][input[y].length-1].h;
		for (let x=input[y].length-2; x >= 0; x--) {
			input[y][x].r = tallest;
			input[y][x].v = input[y][x].h > tallest ? 1 : 0;
			tallest = Math.max(tallest, input[y][x].h);
		}
	}
	// Scan for visibility from the top
	for (let x=0; x<input[0].length; x++) {
		let tallest = input[0][x].h;
		for (let y=1; y<input.length; y++) {
			input[y][x].t = tallest;
			input[y][x].v = input[y][x].h > tallest ? 1 : 0;
			tallest = Math.max(tallest, input[y][x].h);
		}
	}
	// Scan for visibility from the bottom
	for (let x=0; x<input[0].length; x++) {
		//let tallest = input[0][x].h;
		let tallest = input[input.length-1][x].h;
		for (let y=input.length-2; y >= 0; y--) {
			input[y][x].b = tallest;
			input[y][x].v = input[y][x].h > tallest ? 1 : 0;
			tallest = Math.max(tallest, input[y][x].h);
		}
	}
	// Set the visibility of each tree
	// Visible if taller than tallest thing seen from any direction
	input.flat().forEach(t => t.v = 0
		|| t.h > t.l
		|| t.h > t.r
		|| t.h > t.t
		|| t.h > t.b
		? 1 : 0
	);
}

// Gets a line of input as a flat array, starting at x,y and proceeding in direction dx,dy
function getLine(input, x, y, dx, dy) {
	let line = [];
	const size = input[0].length; // Assumed square
	while (x >= 0 && x < size && y >= 0 && y < size) {
		line.push(input[y][x]);
		x += dx;
		y += dy;
	}
	return line;
}

// Grabs lines of input in all directions, uses reduce to store the tallest tree see in that direction
function scanVisibility(input) {
	const size = input[0].length;

	function setTallest(dir) {
		return (tallest, tree) => {
			tree[dir] = tallest;
			return Math.max(tallest, tree.h);
		};
	}

	for (let x=0; x < size; x++) {
		let line = getLine(input, x, 0, 0, 1); // Scan down column
		line.reduce(setTallest('t'), -1); // Set tallest seen from top
		line.reduceRight(setTallest('b'), -1); // Set tallest seen from bottom
	}

	for (let y=0; y < size; y++) {
		let line = getLine(input, 0, y, 1, 0); // Scan across row
		line.reduce(setTallest('l'), -1); // Set tallest seen from left
		line.reduceRight(setTallest('r'), -1); // Set tallest seen from right
	}

	// Set the visibility of each tree
	// Visible if taller than tallest thing seen from any direction
	input.flat().forEach(t => t.v = (t.h > t.l || t.h > t.r || t.h > t.t || t.h > t.b ? 1 : 0));
}

// Grabs lines of input in all directions, uses reduce to store the tallest tree see in that direction
function scanVisibility(input) {
	const size = input[0].length;

	function setTallest(dir) {
		return (tallest, tree) => {
			tree[dir] = tallest;
			return Math.max(tallest, tree.h);
		};
	}

	for (let x=0; x < size; x++) {
		let line = getLine(input, x, 0, 0, 1); // Scan down column
		line.reduce(setTallest('t'), -1); // Set tallest seen from top
		line.reduceRight(setTallest('b'), -1); // Set tallest seen from bottom
	}

	for (let y=0; y < size; y++) {
		let line = getLine(input, 0, y, 1, 0); // Scan across row
		line.reduce(setTallest('l'), -1); // Set tallest seen from left
		line.reduceRight(setTallest('r'), -1); // Set tallest seen from right
	}

	// Set the visibility of each tree, visible if taller than tallest thing seen from any direction
	input.flat().forEach(t => t.v = (t.h > t.l || t.h > t.r || t.h > t.t || t.h > t.b ? 1 : 0));
}

function part1(input) {
	scanVisibility(input);
	let visibility = input.map(row => row.map(t => `${t.h}:${t.v}`));
	console.log(visibility);
	// Count of trees that are visible
	return input.flat().filter(t => t.v).length;
}

function countView(line, myHeight) {
	let view = line.findIndex(t => t.h >= myHeight);
	return view === -1 ? line.length : view + 1;
}

function checkScenic(input, x, y) {
	let tree = input[y][x];

	let views = [
		countView(getLine(input, x, y-1, 0, -1), tree.h),
		countView(getLine(input, x-1, y, -1, 0), tree.h),
		countView(getLine(input, x+1, y, 1, 0), tree.h),
		countView(getLine(input, x, y+1, 0, 1), tree.h),
	];
	tree.s = views.reduce((a, b) => a * b);
	console.log('Views', views);
	return tree.s;
}

function part2(input) {
//	checkScenic(input, 2, 1); // The sample tree
	for (let x=0; x < input.length; x++) {
		for (let y=0; y < input.length; y++) {
			checkScenic(input, x, y);
		}
	}

	let scenic = input.map(row => row.map(t => `${t.h}:${t.s}`));
	console.log(scenic);
	let scenicScores = input.flat().map(t => t.s).sort(numSort).reverse();
	return scenicScores[0];
}

//console.log(part1(parse("sample.8")));
//console.log(part1(parse("input.8")));
console.log(part2(parse("sample.8")));
console.log(part2(parse("input.8")));

