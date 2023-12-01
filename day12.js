const fs = require('fs');

/// Utility functions
const numSort = (a, b) => a - b;
const sum = (a, b) => a + b;
///

function findMinBy(list, propName) {
	let lowIndex = 0;
	for (var i=0; i < list.length; i++) {
		if (list[i][propName] < list[lowIndex][propName]) {
			lowIndex = i;
		}
	}
	return list[lowIndex];
}

function removeFromList(list, object) {
	let index = list.indexOf(object);
	list.splice(index, 1);
	return list;
}

function getNeighbors(graph, currentNode) {
	let neighbors = []
	currentNode.l && neighbors.push(graph[currentNode.y][currentNode.x-1]);
	currentNode.r && neighbors.push(graph[currentNode.y][currentNode.x+1]);
	currentNode.u && neighbors.push(graph[currentNode.y-1][currentNode.x]);
	currentNode.d && neighbors.push(graph[currentNode.y+1][currentNode.x]);
	return neighbors;
}

function astar(graph, heuristic, start, end) {
	let open = [];
	let closed = [];

	// Reset
	graph.flat().map(n => {
		n.f = null;
		n.g = null;
		n.h = null;
		n.parent = null;
	});
	//console.log(start, end);
	open.push(graph[start.y][start.x]);


	while(open.length) {
		let currentNode = findMinBy(open, 'f'); // Get open node with smallest f
		//console.log('CurrentNode:', currentNode.x, currentNode.y, currentNode.l, currentNode.r, currentNode.u, currentNode.d);

		// Have we found the end?
		if (currentNode.x == end.x && currentNode.y == end.y) {
			let result = [];
			while (currentNode.parent) {
				result.push(currentNode);
				currentNode = currentNode.parent;
			}
			return result.reverse();
		}

		// Mode currentNode from open to closed, process each of its neighbors
		removeFromList(open, currentNode);
		closed.push(currentNode);
		let neighbors = getNeighbors(graph, currentNode);
		//console.log('Neighbors:', neighbors.map(a => [a.x, a.y]));

		for (let n of neighbors) {
			if (closed.indexOf(n) >= 0) {
				continue;
			}
			//console.log('Neighbor:', n);

			let gScore = currentNode.g + 1; // 1 is the distance from this node to its neighbor
			let gBest = false;
			if (open.indexOf(n) < 0) {
				// First time we've seen this node, so it is assumed best
				gBest = true;
				n.h = heuristic(n, end);
				open.push(n);
			} else if (gScore < n.g) {
				gBest = true;
			}

			if (gBest) {
				n.parent = currentNode;
				n.g = gScore;
				n.f = n.g + n.h;
			}
		}
	}
	return [];
}


function parse(input) {
	let lines = fs.readFileSync(input, 'ascii').trim().split("\n");
	let grid = [];
	let graph = {
		start: null,
		end: null,
		grid,
	}
	lines.forEach((line, y) => {
		line.split("").forEach((chr, x) => {
			let height = (chr=='S' ? 1 : (chr=='E' ? 26 : chr.charCodeAt(0)-96));
			grid[y] = Array.isArray(grid[y]) ? grid[y] : [];
			grid[y][x] = {z: parseInt(height), f: null, g: null, h: null, x:x, y:y, parent: null};
			if (chr=='S') {
				graph.start = {x,y};
			}
			if (chr == 'E') {
				graph.end = {x, y};
			}
			graph.width = x+1;
		});
		graph.height = y+1;
	});
	// Reachability
	for (let y=0; y<graph.height; y++) {
		for (let x=0; x<graph.width; x++) {
			let node = graph.grid[y][x];
			node.u = y > 0 && node.z >= grid[y-1][x].z-1;
			node.d = y < graph.height-1 && node.z >= grid[y+1][x].z-1;
			node.l = x > 0 && node.z >= grid[y][x-1].z-1;
			node.r = x < graph.width-1 && node.z >= grid[y][x+1].z-1;
		}
	}

	return graph;
}


function manhattanDistance(a, b) {
	var d1 = Math.abs(b.x - a.x);
	var d2 = Math.abs(b.y - a.y);
	return d1 + d2;
}


function part1(input) {
	let path = astar(input.grid, manhattanDistance, input.start, input.end);
	console.log('Path length:', path.length);
	return path.map(p => [p.x, p.y]);
}

function part2(input) {
	let starts = input.grid.flat().filter(n => n.z == 1);
	for (start of starts) {
		console.log('Start:', start.x, start.y);
		let path = astar(input.grid, manhattanDistance, start, input.end);
		console.log('Path length:', path.length);
		start.pathLen = path.length;
	}
	let possible = starts.filter(s => s.pathLen > 0)
	possible.sort((a,b) => a.pathLen - b.pathLen);
	console.log('Start Path lengths:', possible.map(s => [s.x, s.y, s.pathLen]));
	//return path.map(p => [p.x, p.y]);
}


//console.log(part1(parse("data/sample.12")));
//console.log(part1(parse("data/input.12")));
//console.log(part2(parse("data/sample.12")));
console.log(part2(parse("data/input.12")));

