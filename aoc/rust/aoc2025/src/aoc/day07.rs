use common::problem::day::{AoCProblem, Solution};
use std::collections::{HashMap, HashSet};

const START: char = 'S';
const SPLITTER: char = '^';

type Pt = (isize, isize);

pub struct Day07 {
    starting_pt: Pt,
    splitter_pts: Vec<Pt>,
    num_rows: usize,
}

impl AoCProblem for Day07 {
    fn prepare(input: String) -> Self {
        let manifold_board: Vec<Vec<char>> =
            input.lines().map(|line| line.chars().collect()).collect();
        let starting_pt = (
            0_isize,
            manifold_board[0]
                .iter()
                .enumerate()
                .find(|(_, c)| **c == START)
                .unwrap()
                .0 as isize,
        );

        let mut splitter_pts: Vec<Pt> = vec![];
        for (ridx, row) in manifold_board.iter().enumerate() {
            for cidx in (0..row.len()).filter(|c| row[*c] == SPLITTER) {
                splitter_pts.push((ridx as isize, cidx as isize));
            }
        }

        // We want all column indices to be sorted from least to greatest so that we can ensure
        // as we "advance" through the manifold, we're correctly finding the next splitter by
        // the next smallest column idx.
        splitter_pts.sort_by(|(_, fc), (_, sc)| fc.cmp(sc));
        Self {
            starting_pt,
            splitter_pts,
            num_rows: manifold_board.len(),
        }
    }

    fn part1(&mut self) -> Solution {
        let mut num_splits = 0;
        let mut pts_to_consider = HashSet::from([self.starting_pt]);
        loop {
            if pts_to_consider.is_empty() {
                break;
            }

            let mut next = HashSet::new();
            for (row, col) in pts_to_consider {
                if self.splitter_pts.contains(&(row + 1, col)) {
                    next.insert((row + 1, col + 1));
                    next.insert((row + 1, col - 1));
                    num_splits += 1;
                } else {
                    if row as usize > self.num_rows {
                        continue;
                    }

                    next.insert((row + 1, col));
                }
            }

            pts_to_consider = next;
        }

        num_splits.into()
    }

    fn part2(&mut self) -> Solution {
        /// Represents an instance of time in which the end of a splitter (denoted by the given
        /// row and column index) is traversing through the manifolds at this point in time.
        ///
        /// # Parameters
        /// - `splitters`: A slice of splitters that is in the tachyon manifold.
        /// - `max_row`: The maximum number of rows represented in the corresponding diagram.
        /// - `ridx`: The row index (relative to the diagram) of the beam at this point in time.
        /// - `cidx`: The column index of the beam at this point in time.
        /// - `cache`: A cache storing already-computed answers.
        ///
        /// # Returns
        /// The number of timelines the particle ends up at relative to the specified location.
        fn traverse(
            splitters: &[Pt],
            max_row: usize,
            ridx: isize,
            cidx: isize,
            cache: &mut HashMap<Pt, usize>,
        ) -> usize {
            if let Some(res) = cache.get(&(ridx, cidx)) {
                return *res;
            }

            // We reached the end of the diagram, meaning we finished one timeline.
            if ridx as usize >= max_row {
                return 1;
            }

            let res = if splitters.contains(&(ridx + 1, cidx)) {
                traverse(splitters, max_row, ridx + 1, cidx + 1, cache)
                    + traverse(splitters, max_row, ridx + 1, cidx - 1, cache)
            } else {
                traverse(splitters, max_row, ridx + 1, cidx, cache)
            };

            cache.insert((ridx, cidx), res);
            res
        }

        traverse(
            &self.splitter_pts,
            self.num_rows,
            self.starting_pt.0,
            self.starting_pt.1,
            &mut HashMap::new(),
        )
        .into()
    }

    fn day() -> u32 {
        7
    }

    fn year() -> u32 {
        2025
    }
}

// 2143 = high
