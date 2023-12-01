defmodule Aoc do
	# Breaks input into groups. Returns list of groups, where each group is a list of integers
	def parseGroups(input) do
		input
		|> String.trim
		|> String.split("\n")
	end

	def priority(c) when c < "a" do
		:binary.first(c) - 38
	end
	def priority(c) do
		:binary.first(c) - 96
	end

	# Given two strings, find the common characters and returns them as a string
	def commonChars(a, b) do
		MapSet.intersection(MapSet.new(String.graphemes(a)), MapSet.new(String.graphemes(b)))
		|> MapSet.to_list
		|> Enum.join("")
	end

	def part1(input) do
		parseGroups(input)
		|> Enum.map(fn sack ->
			{left, right} = String.split_at(sack, div(String.length(sack), 2))
			common = commonChars(left, right)
			priority(common)
		end)
		|> Enum.sum
	end

	def part2(input) do
		parseGroups(input)
		|> Enum.chunk_every(3)
		|> Enum.map(fn ([a, b, c]) ->
			commonChars(a, b)
			|> commonChars(c)
			|> priority
		end)
		|> Enum.sum
	end

	def run(inputFile) do
		IO.puts(["Reading ", inputFile])
		{:ok, input} = File.read(inputFile)
		IO.inspect ["Part 1:", part1(input)]
		IO.inspect ["Part 2:", part2(input)]
	end
end

Aoc.run("sample.3")
Aoc.run("input.3")
