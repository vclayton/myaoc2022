const fs = require('fs');
const sum = (a, b) => a + b;

function parse(input) {
	return fs.readFileSync(input, 'ascii').trim().split("\n");
}

let dirs, cwd;

function addDirSize(dir, size) {
	dir.size += size;
	if (dir.parent) {
		addDirSize(dir.parent, size);
	}
}
function mkdir(name) {
	if (!cwd.dirs[name]) {
		cwd.dirs[name] = {name: name, files:{}, dirs:{}, size:0, parent: cwd};
		dirs.push(cwd.dirs[name]);
	}
	return cwd.dirs[name];
}
function runScript(input) {
	dirs = [
		{name: '/', files:{}, dirs:{}, size:0, parent: null}
	];
	cwd = dirs[0];

	for (let line of input) {
		let words = line.split(' ');
		if (words[0] == '$') {
			switch(words[1]) {
				case 'cd':
					let name = words[2];
					if (name == '..') {
						cwd = cwd.parent;
					} else if (name == '/') {
						cwd = dirs[0];
					} else {
						cwd = mkdir(name);
					}
					break;
				case 'ls': // just ignore
			}
		} else { // ls output
			let size = parseInt(words[0]);
			let name = words[1];
			if (words[0] == 'dir') {
				mkdir(name)
			} else {
				cwd.files[name] = size;
				addDirSize(cwd, size);
			}
		}
		console.log(line);
	}
	//console.log(dirs);
	return dirs;
}
function part1(input) {
	runScript(input);
	console.log(dirs.map(d => [d.name, d.size]));
	let rmdirs = dirs.filter(d => d.size <= 100000);
	console.log('Remove: ', rmdirs.map(d => [d.name, d.size]));
	return rmdirs.map(d => d.size).reduce(sum);
}

function part2(input) {
	runScript(input);
	let unusedSpace = 70000000 - dirs[0].size;
	let neededSpace = 30000000 - unusedSpace;
	console.log('UnusedSpace', unusedSpace, 'Needed: ', neededSpace);
	console.log(dirs.map(d => [d.name, d.size]));
	let rmdirs = dirs.filter(d => d.size >= neededSpace);
	rmdirs.sort((a,b) => a.size - b.size);
	console.log('Remove: ', rmdirs.map(d => [d.name, d.size]));
	return rmdirs[0].size;
}

//console.log(part1(parse("sample.7")));
//console.log(part1(parse("input.7")));

//console.log(part2(parse("sample.7")));
console.log(part2(parse("input.7")));

