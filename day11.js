const fs = require('fs');

/// Utility functions
const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;
///

function opFunc(op, arg) {
	if (arg == 'old') {
		return (op == '*') ? ((x, m) => (x%m) * (x%m)) : ((x, m) => (x%m) + (x%m));
	}
	arg = parseInt(arg);
	return (op == '*') ? ((x, m) => (x%m) * (arg%m)) : ((x, m) => (x%m) + (arg%m));
}

function parse(input) {
	let lines = fs.readFileSync(input, 'ascii').trim().split("\n");
	let monkeys = [];
	let currentMonkey = 0;
	let monkey = {};
	lines.forEach((line, y) => {
		words = line.trim().split(/\s/);
		console.log(words);
		switch(words[0]) {
			case 'Monkey':
				currentMonkey = parseInt(words[1]);
				monkey = {
					id: currentMonkey,
					items: [],
					op: null,
					test: 0,
					t: null,
					f: null,
					biz: 0,
				};
				monkeys[currentMonkey] = monkey;
				break;
			case 'Starting':
				let i = words.slice(2).map(s=>parseInt(parseInt(s.trim())));
				monkey.items.push(...i);
				break;
			case 'Operation:':
				monkey.op = opFunc(words[4], words[5]);
				break;
			case 'Test:':
				monkey.test = parseInt(words[3]);
				break;
			case 'If':
				monkey[words[1]=='true:' ? 't':'f'] = parseInt(words[5]);
				break;
			default:
		}
	});
	return monkeys;
}


function doRound(monkeys, worryDiv) {
	monkeys.forEach(monkey => {
		while(i = monkey.items.shift()) {
			monkey.biz++;
			worry = monkey.op(i);
			//worry = Math.floor(worry / worryDiv);
			worry = worry / worryDiv
			let target = worry % monkey.test ? monkey.f : monkey.t;
			monkeys[target].items.push(worry);
		}
	});
	return monkeys;
}

function part1(input) {
	let monkeys = input;
	for(round=1; round <= 20; round++) {
		monkeys = doRound(input, parseInt(3));
		console.log(`Round ${round} ITEMS:`, monkeys.map(m=>m.items));
	}

	return monkeys.map(m=>m.biz).sort(numSort).slice(-2).reduce((m,a)=>m*a);
}

function doRound2(monkeys) {
	//let modulo = monkeys.map(m=>m.test).reduce((m,a) => m*a);
	let modulo = 9699690 * 6;
	console.log('Modulo:', modulo);
	monkeys.forEach(monkey => {
		while(i = monkey.items.shift()) {
			monkey.biz++;
			worry = monkey.op(i, modulo);
			let remainder = worry % monkey.test;
			if (!remainder) {
//				worry = worry / monkey.test;

			}

			let target = remainder ? monkey.f : monkey.t;
			monkeys[target].items.push(worry);
		}
	});
	return monkeys;
}


function part2(input) {
	let monkeys = input;
	let t = monkeys.map(m=>m.test);
	console.log(t);

	for(round=1; round <= 10000; round++) {
		monkeys = doRound2(input);
		console.log(`Round ${round} `, ' Biz:', monkeys.map(m=>m.biz));
	}

	return monkeys.map(m=>m.biz).sort(numSort).slice(-2).reduce((m,a)=>m*a);
}

//console.log(part1(parse("data/sample.11")));
//console.log(part1(parse("data/input.11")));
//console.log(part2(parse("data/sample.11")));
console.log(part2(parse("data/input.11")));  // 9699690

