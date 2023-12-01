defmodule Aoc do
	# Breaks input into groups. Returns list of groups, where each group is a list of integers
	def parse(input) do
		input
		|> String.trim
		|> String.split("\n")
	end

	def part1(input) do
		input
		# |> Enum.map(fn row ->
		# 	[a1, a2, b1, b2] = String.split(row, ~r{[-,]}) |> Enum.map(fn s -> Integer.parse(s) end)
		# 	aContains = (a1 <= b1 && a2 >= b2);
		# 	bContains = (b1 <= a1 && b2 >= a2);
		# 	case aContains or bContains do
		# 		true -> 1
		# 		false -> 0
		# 	end
		# end)
		# |> Enum.sum
	end

	def isUnique(buf) do
		buf
		|> String.split("")
		|> Enum.map(fn c ->
		end)

	end

## function part1(input) {
## 	const max = 4;
## 	let buf = []
## 	for (let i=0; i<input.length; i++) {
## 		if (buf.length >= max) {
## 			buf.shift();
## 		}
## 		buf.push(input[i]);
## 		if (buf.length === max && isUnique(buf)) {
## 			return i+1;
## 		}
## 	}
## }
##
## function isUnique(buf) {
## 	for (let i=0; i<buf.length; i++) {
## 		let c = buf[i];
## 		for (j=i+1; j<buf.length; j++) {
## 			if (buf[j] === c) {
## 				return false;
## 			}
## 		}
## 	}
## 	return true;
## }




	def part2(input) do
		parseGroups(input)
		|> Enum.map(fn row ->
			[a1, a2, b1, b2] = String.split(row, ~r{[-,]}) |> Enum.map(fn s -> Integer.parse(s) end)
			aContains = (a2 >= b1 && a1 <= b2);
			bContains = (b2 >= a1 && b1 <= a2);
			case aContains or bContains do
				true -> 1
				false -> 0
			end
		end)
		|> Enum.sum
	end

	def run(inputFile) do
		IO.puts(["Reading ", inputFile])
		{:ok, input} = File.read(inputFile)
		IO.inspect ["Part 1:", part1(parse(input))]
		# IO.inspect ["Part 2:", part2(input)]
	end
end

Aoc.run("data/sample.6")
# Aoc.run("data/input.5")
