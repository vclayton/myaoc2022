const fs = require('fs');


function getNeighbors(graph, currentNode) {
	let neighbors = []
	for (label of currentNode.edges) {
		neighbors.push(graph[label]);
	}
	return neighbors;
}

function astar(graph, heuristic, start, end) {
	let open = [];
	let closed = [];

	// Reset
	graph.nodes.map(n => {
		n.f = null;
		n.g = null;
		n.h = null;
		n.parent = null;
	});
	//console.log(start, end);
	open.push(graph[start]);


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
	let graph = {
		current: null,
		flows: [],
		nodes: [],
	};
	let lines = fs.readFileSync(input, 'ascii').trim().split("\n");
	lines.forEach((line) => {
		let parts = line.split(/[ =,;]/).filter(n => !!n);
		let label = parts[1];
		let rate = parseInt(parts[5]);
		let edges = parts.slice(10);
		graph[label] = {label, rate, edges, on: false, cost: {}};
		graph.nodes.push(graph[label]);
	});
	graph.current = 'AA';
	graph.flows = graph.nodes.filter(n => n.rate).map(n => n.label);
	return graph;
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

function markDistance(graph, src, others, dist) {
	let nextHop = [];
	for (dst of others) {
		let dest = graph[dst];
		if (!src.cost[dst] || dist < src.cost[dst]) {
			src.cost[dst] = dist;
			nextHop = nextHop.concat(dest.edges.slice());
		}
		markDistance(graph, src, nextHop, dist+1);
	}
}

function part1(input) {
	let graph = input;

	// Calculate costs of getting to each node
	for (src of graph.nodes) {
		markDistance(graph, src, src.edges.slice(), 1);
	}
	let flows = graph.nodes.filter(n => n.rate > 0);

	// Simulate
	let open = [];
	let total = 0;
	let current = graph.current;
	for (let t=1; t<=30; t++) {
		console.log(`== Minute ${t} ==`);
		let rates = graph.flows.map(label => graph[label]).sort((a, b) => a.rate - b.rate);
		let target = rates.shift();


	}

	console.log('Hey', graph);
	return 1;
}

function part2(input, size) {
}

console.log(part1(parse("data/sample.16")));
//console.log(part1(parse("data/input.16"))); // Correct:
//console.log(part2(parse("data/sample.16")));
//console.log(part2(parse("data/input.16"))); // Correct:



