# My Advent Of Code 2022

This is the code I wrote to solve the coding challenges for the Advent of Code 2022. I'm initially solving the problems using javascript, but I'd like to learn Elixir, so after I know I've got the logic correct I'm porting my solutions over to Elixir.
For JS, I'm using node v14.18.1.

## Running elixir from docker
Installing and updating elixir natively can sometimes be a pain, so i'd like to avoid that for now.
Using the official elixir docker image I can run either the REPL or a .exs script, and I made scripts `elixir-run` and `iex` that just wrap the proper invocations.

### Day 1
I started in JS, with the sample input as an inline string. Then when I saw the full input I decided it needed to go somewhere else, so I made an input1.js file that just exports both the sample input and official input, making it easy to switch between them while coding.

When I was porting to elixir I decided to split them into separate plain text files, sample.1 and input.1.

### Day 2
After pondering the puzzle for a bit I decided that it basically came down to a lookup table for each possible input

### Day 3


### Day 8
In part 1 I kept stumbling on the visibility scanning, particularly in the "backwards" directions. Eventually got it right, but with ugly code.
Part 2 forced me to clean things up a lot. I started with a generic `getLine` function that returns a flat array of the trees in a line from a given starting point and with a given direction. Using that I rewrote the scanVisibility function from part 1, much nicer.
Then, for each tree in the grid, I used getLine to basically ray cast in 4 directions from the tree. In each direction I found the first index of a tree that blocks the view and that's the view distance in that direction. And of course, I got the wrong answer the first time I submitted it, because I sorted all the scenic view scores and forgot that JS defaults to string sort, even for an array of numbers.

### Day 9
First guess was too high. I banged my head against this for over an hour before realizing that I was running the sample input each time before running the actual input, and there was some state left over. Doofus mistake. >:(
Then for part 2 I switched to an array of knots instead of individual variables. The fail there was this part: 	`rope.fill([0, 0]);` This *does not* do the right thing. It gives you an array, filled with the same values, but they are *literally the same* values. All reference the original `[0, 0]` so changes to the head of the rope were also changing the rest of it.

### Day 11
Part 1 fairly straight forward. Missed the fact that the operation could have "old" on both sides.

Part 2. Big numbers causing worry to go to infinity. :( Switch to using JS BigInt. That got correct answers, but started choking around round 700.
So it's not a code problem, it's a math problem now: how to know if the result of multiplying two numbers and will be divisible by N, without having to actually do it.
Or if the result _is_ divisible can you go ahead and divide it without losing your place?

Can we do the modulo before multiplying?. My math classes didn't cover advanced properties of modulus, but google tells me that `(x % n) * (y % n) = (x*y) % n`.
Trying to just mod the worry value by the test number for each monkey didn't work out though. :( The problem there is that each monkey has a different test number, so we have to mod by a different value for each monkey.
I notice that they're all prime numbers. This better not turn into some crypto implementation.

OK, I don't think we don't need to know the actual worry number, we just need to make it smaller without interfering with the modulo tests of the different monkeys.
If the monkey numbers are a repeating sequence then we should be able to line them all up and find some point where they all repeat together. Then I think we can use that number as the modulo across all of the monkeys without hosing their results.
This should be the least common multiple of all the numbers. I went to calculatorsoup.com to calculate it. For the sample input it's 96577.
It worked! Using the LCM as a common modulo number for all the monkeys did the trick.
Hey, then I noticed that instead of using a calculator to find LCM, I could just find *a* common multiple, and the easiest way to get that is just multiply all the test values together.
Huh, I think it turns out for a set of all prime numbers that _is_ the LCM.

Happy to have gotten this working. Not happy that it was basically "how much math do you know?"

### Day 12
Initial though: Looks like A* pathfinding to me. I messed with it a bit a long time ago for game-code purposes. Time to dust that off...
Took a while to get the kinks worked out, but A* did the job. For part 2, I just filtered all the nodes to ones with height 1, then ran A* with each of them as the start and took the lowest resulting path length.

### Day 13
Implementing a custom recursive comparator function. Not a problem. But it did require dumping out logs a comparing to the example output to get the logic correct.
Part 1 just used it to mark each pair as correct or not (if the comparator returned -1 it's good).
Part 2 was to pass that function to array.sort(), and do indexOf() for the special entries.

### Day 14
A fun little sandbox. Made gridSet() and gridGet() functions that automatically tracked the min/max of x/y, and took care of allocating new rows and such.

### Day 15
Re-used the grid functions from day 14. Worked fine for the sample set, but the actual input is scaled such that the naive fill-in-the-blanks approach runs out of memory on the first line.
Bummer. Will have to use clever geometry instead.
Thankfully I could embed all of that in the gridGet() function, so that for any given x,y it can iterate through the set of scanners and calculate if the point is within the manhattan distance to know if it's covered or open.
For part 2 I'm sure I'm supposed to use clever geometry also, because we're searching a space that's 1.6×10¹³. Just for fun though I'm going to try the lazy/naive approach first. Maybe start up a few more processes starting their search at different points, let it burn some spare cpu cores while I'm at work.

A better approach? When checking a point on the grid, we can get its total distance from a scanner, then subtract its y distance and skip the remaining distance in x, since we know those locations will still be within the manhattan distance. That got through the whole search in under a minute, but didn't find the open spot :(.
Ah, I screwed up the math when calculating the skipX value. Now I hit the correct answer in 31 seconds. Given the progress of my naive approach in the meantime, I estimate my parallel brute-force search would have found it in just under two hours.

### Day 16
Reading through this one, I suspect it might be related to the A* from day 12. Finding the optimal path through a graph. We only need to visit each interesting node, where interesting means nonzero flow rate.
First I calculated the total cost to get from each node to each other node. Naive approach now is to start at AA and try all the permutations of interesting node order and calculate the resulting score. Doable with the sample, but this works out to 15 factorial permutations in the actual input data, so not practical.

