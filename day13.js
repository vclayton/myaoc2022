const fs = require('fs');
/// Utility functions
const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;

///

function compare1(a, b, tab) {
	tab = tab || 0;
	let indent = ' '.repeat(tab*2);
	const aInt = typeof a === 'number';
	const bInt = typeof b === 'number';
	console.log(indent, 'Compare', a, 'vs', b);
	let diff = null;
	if (aInt && bInt) {
		diff = a < b ? -1 : (a == b ? 0 : 1);
		if (diff < 0) {
			console.log(indent, 'Left side smaller, so inputs are right', diff);
		}
		return diff;
	}
	if (aInt && !bInt) {
		console.log(indent, `Mixed types; convert left to [${a}] and retry`);
		return compare1([a], b, tab+1);
	}
	if (!aInt && bInt) {
		console.log(indent, `Mixed types; convert right to [${b}] and retry`);
		return compare1(a, [b], tab+1);
	}
	let i=0;
	console.log(indent, 'Left,right lengths: ', a.length, b.length);
	for (i=0; i<a.length && i<b.length; i++) {
		diff = compare1(a[i], b[i], tab+1);
		//console.log(indent, `Diff[${i}]:`, diff, a[i], b[i]);
		if (diff) {
			return diff;
		}
	}
	if (a.length == b.length) {
		return 0;
	}
	if (i >= a.length) { // < b.length) {
		console.log(indent, 'Left side is out', i, a);
		return -1;
	} else if (i >= b.length) { // > a.length) {
		console.log(indent, 'Right side is out', i, b);
		return 1;
	}

	return 0;
}


function parse(input) {
	let lines = fs.readFileSync(input, 'ascii').trim().split("\n");
	let pairs = [];
	let i = 1;
	let pair = {a: null, b:null, i: i++};
	lines.forEach((line, y) => {
		if (line == '') {
			pairs.push(pair);
			pair = {a: null, b:null, i: i++};
		} else if (pair.a === null) {
			pair.a = JSON.parse(line);
		} else if (pair.b === null) {
			pair.b = JSON.parse(line);
		}
	});
	if (pair.a !== null && pair.b !== null) {
		pairs.push(pair);
	}
	return pairs;
}

function part1(input) {
	input.forEach((pair) => {
		console.log('== Pair', pair.i);
		pair.ok = compare1(pair.a, pair.b) < 0;
		console.log(pair.ok ? 'Right' : 'NOT Right');
	});
	let rights = input.filter(pair => pair.ok);
	console.log('Rights: ', rights.map(p => p.i));

	return rights.map(pair => pair.i).reduce(sum);
}

function part2(input) {
	const a = [[2]];
	const b = [[6]];
	let packets = input.map(pair => [pair.a, pair.b]).flat(1);
	packets.push(a);
	packets.push(b);

	packets.sort(compare1);
	console.log(packets);
	let aIndex = packets.indexOf(a)+1;
	let bIndex = packets.indexOf(b)+1;
	console.log('Indexes: ', aIndex, bIndex);

	return aIndex * bIndex;;
}

//console.log(part1(parse("data/sample.13")));
//console.log(part1(parse("data/input.13"))); // 7686 is too high :( ALSO 6251 is too high :(
//console.log(part2(parse("data/sample.13")));
console.log(part2(parse("data/input.13")));



