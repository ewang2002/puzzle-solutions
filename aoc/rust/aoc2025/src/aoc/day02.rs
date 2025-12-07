use common::numbers::{join_digits, to_digits};
use common::problem::day::{AoCProblem, Solution};

pub struct Day02 {
    product_id_ranges: Vec<(usize, usize)>,
}

impl AoCProblem for Day02 {
    fn prepare(input: String) -> Self {
        Self {
            product_id_ranges: input
                .split(',')
                .map(|range| range.split_once('-').unwrap())
                .map(|(l, r)| (l.parse().unwrap(), r.parse().unwrap()))
                .collect(),
        }
    }

    fn part1(&mut self) -> Solution {
        self.product_id_ranges
            .iter()
            .map(|(min, max)| {
                (*min..=*max)
                    .map(to_digits)
                    // For the ID to be invalid, the left-half and right-half needs to be the same
                    // so the length needs to be even so we can evenly divide the two halves.
                    .filter(|d| d.len() % 2 == 0 && d[..d.len() / 2] == d[d.len() / 2..])
                    .map(|d| join_digits(&d))
                    .sum::<usize>()
            })
            .sum::<usize>()
            .into()
    }

    fn part2(&mut self) -> Solution {
        fn is_invalid_id(num: usize) -> bool {
            let digits = to_digits(num);

            // Get all multiples of digits.len() except for digits.len() itself since we want
            // to evenly divide up the number into multiples to check for equality
            let multiples_of_len = (1..digits.len())
                .filter(|l| digits.len().is_multiple_of(*l))
                .collect::<Vec<_>>();

            // now that we have all multiples, go through them and see if we can find any
            // repeating digits
            for multiple in multiples_of_len {
                let base = join_digits(&digits[..multiple]);
                // Skip the first chunk because that's the same as the base
                if digits
                    .chunks(multiple)
                    .skip(1)
                    .all(|c| join_digits(c) == base)
                {
                    return true;
                }
            }

            false
        }

        self.product_id_ranges
            .iter()
            .map(|(min, max)| (*min..=*max).filter(|n| is_invalid_id(*n)).sum::<usize>())
            .sum::<usize>()
            .into()
    }

    fn day() -> u32 {
        2
    }

    fn year() -> u32 {
        2025
    }
}
