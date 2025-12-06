use common::problem::day::{AoCProblem, Solution};

pub struct Day06 {
    input: String,
}

impl AoCProblem for Day06 {
    fn prepare(input: String) -> Self {
        Self { input }
    }

    fn part1(&mut self) -> Solution {
        let hw = self
            .input
            .lines()
            .map(|line| line.split_whitespace().collect::<Vec<_>>())
            .collect::<Vec<_>>();

        // Go through each column and collect the numbers, and then figure out what
        // operator to apply to all numbers in that column.
        let mut total: usize = 0;
        for col in 0..hw[0].len() {
            let all_nums_in_col = hw[..hw.len() - 1]
                .iter()
                .map(|r| r[col].parse::<usize>().unwrap())
                .collect::<Vec<_>>();

            total += match hw[hw.len() - 1][col] {
                "+" => all_nums_in_col.into_iter().sum::<usize>(),
                "*" => all_nums_in_col.into_iter().product::<usize>(),
                _ => panic!("unknown op"),
            }
        }

        total.into()
    }

    fn part2(&mut self) -> Solution {
        let mut hw: Vec<Vec<char>> = self
            .input
            .lines()
            .map(|line| line.chars().collect())
            .collect();

        // Pad the end of each vec so that each vec has the same number of elements.
        let max_len = hw.iter().map(|l| l.len()).max().unwrap();
        for line in &mut hw {
            while line.len() < max_len {
                line.push(' ');
            }
        }

        // Starting from the right-most problem (main column), keep iterating until we hit the
        // individual column with the operation. When we hit the column with the operation, we
        // know that  we've found the problem to solve.
        //
        // Keep doing this until we reach the left-hand side.
        let mut total = 0;
        let mut col = hw[0].len() - 1;
        let mut numbers = vec![];
        loop {
            // Get the number in each individual column within a problem, combining them together.
            let mut num = 0;
            for row in hw.iter().take(hw.len() - 1) {
                if row[col] == ' ' {
                    continue;
                }

                num = num * 10 + row[col].to_digit(10).unwrap() as usize;
            }

            numbers.push(num);

            // If there's no operation, then we still have another individual column to go
            if hw[hw.len() - 1][col] == ' ' {
                col -= 1;
                continue;
            }

            // Otherwise, we can solve this problem
            total += match hw[hw.len() - 1][col] {
                '+' => numbers.into_iter().sum::<usize>(),
                '*' => numbers.into_iter().product::<usize>(),
                _ => panic!("unknown op"),
            };

            if col == 0 {
                break;
            }

            // -1 to move to the column before that problem was solved
            // -1 because there's an empty column there so we don't want to compute that.
            col -= 2;
            numbers = vec![];
        }

        total.into()
    }

    fn day() -> u32 {
        6
    }

    fn year() -> u32 {
        2025
    }
}
