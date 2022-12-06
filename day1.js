let {sample, input} = require('./input1.js');

function parse(input) {
	let rows = input.trim().split("\n");
	let elves = [];
	let current = {items: [], total: 0};

	for (let i=0; i < rows.length; i++) {
		if (rows[i].length) {
			let amt = parseInt(rows[i]);
			current.items.push(amt);
			current.total += amt;
		} else {
			elves.push(current);
			current = {items: [], total: 0};
		}
	}
	if (current.total) elves.push(current);

	return elves;
}

const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;

let data = parse(sample);
data.sort((a, b) => a.total - b.total);
console.log(data);
let totals = data.map(elf => elf.total);
let result = totals.slice(-3);

//totals.sort(numSort);

console.log(result);
console.log(result.reduce(sum, 0));
