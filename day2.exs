defmodule Aoc do
	# A: Rock, B: Paper, C: Scissors
	# X: Rock, Y: Paper, C: Scissors
	def points do
		%{
			"A X" => 3 + 1,
			"A Y" => 6 + 2,
			"A Z" => 0 + 3,
			"B X" => 0 + 1,
			"B Y" => 3 + 2,
			"B Z" => 6 + 3,
			"C X" => 6 + 1,
			"C Y" => 0 + 2,
			"C Z" => 3 + 3,
		}
	end

	def points2 do
		%{
			"A X" => 0 + 3, # Scissor loses to rock
			"B X" => 0 + 1, # Rock loses to paper
			"C X" => 0 + 2, # Paper loses to scissors
			"A Y" => 3 + 1,
			"B Y" => 3 + 2,
			"C Y" => 3 + 3,
			"A Z" => 6 + 2,
			"B Z" => 6 + 3,
			"C Z" => 6 + 1,
		}
	end

	def play(input, points) do
		input
		|> String.trim
		|> String.split("\n")
		|> Enum.map(fn play -> points[play] end)
		|> Enum.sum
	end

	def run(inputFile) do
		IO.puts(["Reading ", inputFile])
		{:ok, input} = File.read(inputFile)
		IO.inspect ["Part 1:", play(input, points())]
		IO.inspect ["Part 2:", play(input, points2())]
	end
end

Aoc.run("sample.2")
Aoc.run("input.2")
