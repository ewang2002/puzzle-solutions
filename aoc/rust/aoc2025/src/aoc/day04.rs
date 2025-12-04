use common::problem::day::{AoCProblem, Solution};
use std::collections::{HashMap, HashSet};
use std::ops::Index;

pub struct Day04 {
    diagram: Diagram,
}

impl AoCProblem for Day04 {
    fn prepare(input: String) -> Self {
        Self {
            diagram: input
                .lines()
                .map(|line| line.chars().collect())
                .collect::<Vec<_>>()
                .into(),
        }
    }

    fn part1(&mut self) -> Solution {
        let mut ct = 0;
        for i in 0..self.diagram.row_ct {
            for j in 0..self.diagram.col_ct {
                match self.diagram[(i, j)] {
                    DiagramItem::Empty => continue,
                    DiagramItem::PaperRoll => {
                        ct += if self.diagram.num_surrounding_rolls(i, j) < 4 {
                            1
                        } else {
                            0
                        };
                    }
                }
            }
        }

        ct.into()
    }

    fn part2(&mut self) -> Solution {
        let mut total_destroyed = 0;
        loop {
            let amt_destroyed = self.diagram.destroy_once();
            if amt_destroyed == 0 {
                break;
            }

            total_destroyed += amt_destroyed;
        }

        total_destroyed.into()
    }

    fn day() -> u32 {
        4
    }

    fn year() -> u32 {
        2025
    }
}

#[derive(Copy, Clone, Eq, PartialEq)]
enum DiagramItem {
    PaperRoll,
    Empty,
}

struct Diagram {
    map: HashMap<(isize, isize), DiagramItem>,
    row_ct: usize,
    col_ct: usize,
}

impl Diagram {
    /// Creates a new instance of the diagram with the given map and row and column count.
    ///
    /// # Parameters
    /// - `map`: The diagram representation as a map, where the key is a point in the form (i, j)
    ///   and the value is the corresponding item at that point.
    /// - `row_ct`: The number of rows in the original diagram.
    /// - `col_ct`: The number of columns in the original diagram.
    pub fn new(map: HashMap<(isize, isize), DiagramItem>, row_ct: usize, col_ct: usize) -> Self {
        Diagram {
            map,
            row_ct,
            col_ct,
        }
    }

    /// Scans through the diagram once and destroys all paper rolls that have less than 4
    /// adjacent paper rolls (of the 8 possible neighboring points).
    ///
    /// # Returns
    /// The number of paper rolls that were destroyed in this iteration.
    pub fn destroy_once(&mut self) -> usize {
        let mut to_destroy = HashSet::new();
        for i in 0..self.row_ct {
            for j in 0..self.col_ct {
                if self[(i, j)] == DiagramItem::Empty {
                    continue;
                }

                if self.num_surrounding_rolls(i, j) >= 4 {
                    continue;
                }

                to_destroy.insert((i, j));
            }
        }

        for (i, j) in to_destroy.iter().cloned() {
            self.map
                .insert((i as isize, j as isize), DiagramItem::Empty);
        }

        to_destroy.len()
    }

    /// Calculates the number of rolls surrounding a particular point in the diagram.
    ///
    /// # Parameters
    /// - `i`: The row index.
    /// - `j`: The column index.
    ///
    /// # Returns
    /// The number of paper rolls (`@`) that is adjacent to the specified point. This can be a
    /// max of 8 for the 8 adjacent points.
    pub fn num_surrounding_rolls(&self, i: usize, j: usize) -> usize {
        let mut num_surrounding = 0;
        for di in -1..=1 {
            for dj in -1..=1 {
                if di == 0 && dj == 0 {
                    continue;
                }

                if let Some(DiagramItem::PaperRoll) =
                    self.map.get(&((i as isize) + di, (j as isize) + dj))
                {
                    num_surrounding += 1;
                }
            }
        }

        num_surrounding
    }
}

impl Index<(isize, isize)> for Diagram {
    type Output = DiagramItem;

    fn index(&self, index: (isize, isize)) -> &Self::Output {
        self.map.get(&index).expect("out of bounds")
    }
}

impl Index<(usize, usize)> for Diagram {
    type Output = DiagramItem;

    fn index(&self, (i, j): (usize, usize)) -> &Self::Output {
        self.map
            .get(&(i as isize, j as isize))
            .expect("out of bounds")
    }
}

impl From<Vec<Vec<char>>> for Diagram {
    fn from(value: Vec<Vec<char>>) -> Self {
        let mut map: HashMap<(isize, isize), DiagramItem> = HashMap::new();
        for (ridx, row) in value.iter().enumerate() {
            for (cidx, col) in row.iter().enumerate() {
                map.insert(
                    (ridx as isize, cidx as isize),
                    match col {
                        '.' => DiagramItem::Empty,
                        '@' => DiagramItem::PaperRoll,
                        otherwise => panic!("'{otherwise}' not known"),
                    },
                );
            }
        }

        Diagram::new(map, value.len(), value[0].len())
    }
}
