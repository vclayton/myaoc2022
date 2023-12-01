const fs = require('fs');

/// Utility functions
const numSort = (a, b) => a - b;
///


let head = [0, 0],
	tail = [0, 0],
	tailMap = {};

function parse(input) {
	let lines = fs.readFileSync(input, 'ascii').trim().split("\n");
	let moves = [];
	lines.forEach((line, y) => {
		[dir, dist] = line.split(" ");
		moves.push([dir, parseInt(dist)]);
	});
	return moves;
}

function doStep(dir) {
	//tailMap[tail.join(',')] = 1 + (tailMap[tail.join(',')] || 0);
	switch (dir) {
		case 'L': head[0]--; break;
		case 'R': head[0]++; break;
		case 'U': head[1]--; break;
		case 'D': head[1]++; break;
	}
	let dx = head[0] - tail[0],
		dy = head[1] - tail[1];
	switch (`${dx},${dy}`) {
		case '-2,0': tail[0]--; break
		case '2,0': tail[0]++; break
		case '0,-2': tail[1]--; break
		case '0,2': tail[1]++; break

		case '-2,1': tail[0]--; tail[1]++; break;
		case '2,1': tail[0]++; tail[1]++; break;
		case '1,-2': tail[1]--; tail[0]++; break;
		case '1,2': tail[1]++; tail[0]++; break;

		case '-2,-1': tail[0]--; tail[1]--; break;
		case '2,-1': tail[0]++; tail[1]--; break;
		case '-1,-2': tail[1]--; tail[0]--; break;
		case '-1,2': tail[1]++; tail[0]--; break;
		default: console.log('No move needed: ', dx, dy);
	}
//	console.log('Step dir: ', dir, head, tail);
	//let tailPos=`(${tail[0]}`+(tail[1]<0 ? '':'+')+`${tail[1]}j)`;
	let tailPos=`(${tail[0]}, ${tail[1]})`;
	tailMap[tailPos] = 1 + (tailMap[tailPos] || 0);
}

function show() {
	let height = 6, width = 6;
	console.log('Head, tail: ', head, tail);
	for (y=0; y<height; y++) {
		let line = '.'.repeat(width).split(''); //[].fill('.', 0, width);
		0==(y-height+1) && (line[0] = 's');
		tail[1]==(y-height+1) && (line[tail[0]] = 'T');
		head[1]==(y-height+1) && (line[head[0]] = 'H');
		console.log(line.join(''));
	}
}

const DIRS = {L: [-1, 0], R: [1, 0], U: [0, -1], D: [0, 1]};
function _doStep(dir) {
	const d = DIRS[dir];
	head[0] += d[0];
	head[1] += d[1];
	let dx = head[0] - tail[0],
		dy = head[1] - tail[1];
	if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
		tail[0] += Math.sign(dx);
		tail[1] += Math.sign(dy);
	}
	let tailPos=`(${tail[0]}, ${tail[1]})`;
	console.log(tailPos)
	tailMap[tailPos] = 1 + (tailMap[tailPos] || 0);
}

function follow([hx, hy], [tx, ty]) {
	let dx = hx - tx,
		dy = hy - ty;

	if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
	//console.log('DX,DY', dx, dy);
		tx += Math.sign(dx);
		ty += Math.sign(dy);
	}
	return [tx, ty];
}

function doStep3(dir) {
	const d = DIRS[dir];
	head[0] += d[0];
	head[1] += d[1];
	follow(head, tail);
	let tailPos=`(${tail[0]}, ${tail[1]})`;
	tailMap[tailPos] = 1 + (tailMap[tailPos] || 0);
	console.log(tailPos)
}


function part1(moves) {
	head = [0, 0];
	tail = [0, 0];
	tailMap = {};

//	show();
	moves.forEach(([dir, dist]) => {
		console.log([dir, dist]);
		for (; dist > 0; dist--) {
			//doStep(dir);
			//_doStep(dir);
			doStep3(dir);
//			show();
		}
	});
	//console.log(head, tail, JSON.stringify(Object.keys(tailMap).sort()));
//	console.log(head, tail, JSON.stringify(tailMap));

	return Object.keys(tailMap).length;
}


function part2(moves) {
	let rope = [];
	for(let r=0; r<10; r++) {
		rope[r] = [0, 0];
	}
	//rope.length = 2;
	//rope.fill([0, 0]);
	tailMap = {};

	//console.log("INIT", rope);

	moves.forEach(([dir, dist]) => {
		console.log('MOVE', [dir, dist], rope);
		const d = DIRS[dir];
		for (; dist > 0; dist--) {
	//console.log("Begin", rope);
			rope[0][0] += d[0];
			rope[0][1] += d[1];
	//console.log("Before", rope);

			for (r=1; r<rope.length; r++) {
				rope[r] = follow(rope[r-1], rope[r]);
			}
			let tail = rope[rope.length-1];
			let tailPos=`(${tail[0]}, ${tail[1]})`;
			console.log(tailPos)
			tailMap[tailPos] = 1 + (tailMap[tailPos] || 0);
	//console.log("After", rope);
		}
	});
	//console.log(head, tail, JSON.stringify(Object.keys(tailMap).sort()));
//	console.log(head, tail, JSON.stringify(tailMap));

	return Object.keys(tailMap).length;
}

//console.log(part1(parse("data/sample.9")));
//console.log(part1(parse("data/input.9"))); // 6649,6650 is too high >:(
console.log(part2(parse("data/sample2.9")));
console.log(part2(parse("data/input.9")));

