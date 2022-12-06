defmodule Aoc do
	# Breaks input into groups. Returns list of groups, where each group is a list of integers
	def parseGroups(input) do
		input
		|> String.split("\n\n") # Breaks into groups where separated by blank lines
		|> Enum.map(fn g -> (String.split(g) |> Enum.map(&String.to_integer/1)) end) # Splits groups on newlines and parses to integers
	end

	def part1(input) do
		parseGroups(input)
		|> Enum.map(&Enum.sum/1)
		|> Enum.max
	end

	def part2(input) do
		parseGroups(input)
		|> Enum.map(&Enum.sum/1) # Total each group
		|> Enum.sort(:desc)
		|> Enum.slice(1..3)
		|> Enum.sum
	end

	def run(inputFile) do
		IO.puts(["Reading ", inputFile])
		{:ok, input} = File.read(inputFile)
		IO.inspect ["Part 1:", part1(input)]
		IO.inspect ["Part 2:", part2(input)]
	end
end

Aoc.run("sample.1")
Aoc.run("input.1")
