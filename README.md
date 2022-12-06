# My Advent Of Code 2022

This is the code I wrote to solve the coding challenges for the Advent of Code 2022. I'm initially solving the problems using javascript, but I'd like to learn Elixir, so after I know I've got the logic correct I'm porting my solutions over to Elixir.

## Running elixir from docker
Installing and updating elixir natively can sometimes be a pain, so i'd like to avoid that for now.
Using the official elixir docker image I can run either the REPL or a .exs script, and I made scripts `elixir-run` and `iex` that just wrap the proper invocations.

### Day 1
I started in JS, with the sample input as an inline string. Then when I saw the full input I decided it needed to go somewhere else, so I made an input1.js file that just exports both the sample input and official input, making it easy to switch between them while coding.

When I was porting to elixir I decided to split them into separate plain text files, sample.1 and input.1.

### Day 2
After pondering the puzzle for a bit I decided that it basically came down to a lookup table for each possible input
