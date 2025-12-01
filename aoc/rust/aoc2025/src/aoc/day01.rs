use common::problem::day::{AoCProblem, Solution};

pub struct Day01 {
    sequence: Vec<Rotation>,
}

/// Computes the number of times the dial hits the '0' direction and the number of
/// times the dial passes by the '0' direction.
fn compute_num_zeros(sequence: &[Rotation]) -> (usize, usize) {
    let new_rotation: Vec<_> = sequence.iter().flat_map(|s| s.to_hundreds()).collect();

    let mut dial_direction = 50;
    let mut num_dir_zero = 0;
    let mut num_pass_zero = 0;
    for rotation in new_rotation {
        let old = dial_direction;
        match rotation {
            Rotation::Left(amt) => {
                dial_direction -= amt;
                if dial_direction < 0 {
                    dial_direction += 100;
                    if dial_direction != 0 && old != 0 {
                        num_pass_zero += 1;
                    }
                }
            }
            Rotation::Right(amt) => {
                dial_direction += amt;
                if dial_direction == 100 {
                    dial_direction = 0;
                } else if dial_direction > 100 {
                    dial_direction -= 100;
                    num_pass_zero += 1;
                }
            }
        }

        if dial_direction == 0 {
            num_dir_zero += 1;
        }
    }

    (num_dir_zero, num_pass_zero)
}

impl AoCProblem for Day01 {
    fn prepare(input: String) -> Self {
        Self {
            sequence: input.lines().map(Rotation::from_input_line).collect(),
        }
    }

    fn part1(&mut self) -> Solution {
        let (num_zeros, _) = compute_num_zeros(&self.sequence);
        num_zeros.into()
    }

    fn part2(&mut self) -> Solution {
        let (num_zeros, num_passes) = compute_num_zeros(&self.sequence);
        (num_zeros + num_passes).into()
    }

    fn day() -> u32 {
        1
    }

    fn year() -> u32 {
        2025
    }
}

#[derive(Debug)]
enum Rotation {
    Left(isize),
    Right(isize),
}

impl Rotation {
    /// Parses a single line from the given input sequence into a `Rotation` object.
    ///
    /// # Parameters
    /// - `l`: A single line from the input.
    ///
    /// # Returns
    /// The `Rotation` object corresponding to the line.
    pub fn from_input_line(l: &str) -> Rotation {
        match &l[..1] {
            "L" => Rotation::Left(l[1..].parse().unwrap()),
            "R" => Rotation::Right(l[1..].parse().unwrap()),
            r => panic!("unexpected rotation direction '{r}'"),
        }
    }

    /// Breaks up the value of the rotation such that each value is no more than 100.
    ///
    /// # Returns
    /// A list of `Rotation`s such that each value is no more than 100.
    pub fn to_hundreds(&self) -> Vec<Rotation> {
        let mut val = *match self {
            Rotation::Left(s) => s,
            Rotation::Right(s) => s,
        };

        let mut distributed = vec![];
        loop {
            if val < 100 {
                if val != 0 {
                    distributed.push(match self {
                        Rotation::Left(_) => Rotation::Left(val),
                        Rotation::Right(_) => Rotation::Right(val),
                    });
                }
                break;
            }

            distributed.push(match self {
                Rotation::Left(_) => Rotation::Left(100),
                Rotation::Right(_) => Rotation::Right(100),
            });

            val -= 100;
        }

        distributed
    }
}
