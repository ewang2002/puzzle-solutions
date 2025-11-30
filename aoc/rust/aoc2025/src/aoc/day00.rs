use common::problem::day::{AoCProblem, Solution};

pub struct Day00 {
    lines: Vec<Vec<usize>>,
}

impl AoCProblem for Day00 {
    fn prepare(input: String) -> Self {
        Self {
            lines: input
                .lines()
                .map(|l| l.split(' ').map(|n| n.parse::<usize>().unwrap()).collect())
                .collect(),
        }
    }

    fn part1(&mut self) -> Solution {
        self.lines
            .iter()
            .map(|group| group.iter().sum::<usize>())
            .max()
            .unwrap()
            .into()
    }

    fn part2(&mut self) -> Solution {
        self.lines
            .iter()
            .map(|group| group.iter().product::<usize>())
            .min()
            .unwrap()
            .into()
    }

    fn day() -> u32 {
        0
    }

    fn year() -> u32 {
        2025
    }
}
