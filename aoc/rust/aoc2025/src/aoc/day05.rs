use common::constants::TWO_NEWLINE;
use common::interval::IntInterval;
use common::problem::day::{AoCProblem, Solution};
use std::iter::once;

pub struct Day05 {
    ingredient_id_range: Vec<(usize, usize)>,
    available_ingredient_ids: Vec<usize>,
}

impl AoCProblem for Day05 {
    fn prepare(input: String) -> Self {
        let (ingredient_ids, available_ids) = input.split_once(TWO_NEWLINE).unwrap();
        Self {
            ingredient_id_range: ingredient_ids
                .lines()
                .map(|line| line.split_once('-').unwrap())
                .map(|(low, high)| (low.parse().unwrap(), high.parse().unwrap()))
                .collect(),
            available_ingredient_ids: available_ids
                .lines()
                .map(|id| id.parse().unwrap())
                .collect(),
        }
    }

    fn part1(&mut self) -> Solution {
        let intervals = self
            .ingredient_id_range
            .iter()
            .map(|(low, high)| IntInterval::new(*low, *high))
            .collect::<Vec<_>>();
        self.available_ingredient_ids
            .iter()
            .filter(|id| intervals.iter().any(|interval| interval.contains(**id)))
            .count()
            .into()
    }

    fn part2(&mut self) -> Solution {
        let mut merged_intervals = vec![];

        // Converge
        let mut intervals = self.ingredient_id_range.clone();
        intervals.sort_by(|a, b| a.0.cmp(&b.0));

        let mut base_interval = IntInterval::from_tuple(intervals.pop().unwrap());
        while let Some((low, high)) = intervals.pop() {
            let this_interval = IntInterval::new(low, high);
            if let Some(new_interval) = base_interval.merge(&this_interval) {
                base_interval = new_interval;
                continue;
            }

            merged_intervals.push(base_interval);
            base_interval = this_interval;
        }

        merged_intervals
            .iter()
            .chain(once(&base_interval))
            .map(|interval| interval.len())
            .sum::<usize>()
            .into()
    }

    fn day() -> u32 {
        5
    }

    fn year() -> u32 {
        2025
    }
}
