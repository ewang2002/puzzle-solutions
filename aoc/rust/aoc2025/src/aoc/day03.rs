use common::problem::day::{AoCProblem, Solution};
use std::cmp::Ordering;

pub struct Day03 {
    joltage_ratings: Vec<Vec<u32>>,
}

impl AoCProblem for Day03 {
    fn prepare(input: String) -> Self {
        Self {
            joltage_ratings: input
                .lines()
                .map(|battery| {
                    battery
                        .chars()
                        .map(|joltage| joltage.to_digit(10).unwrap())
                        .collect()
                })
                .collect(),
        }
    }

    fn part1(&mut self) -> Solution {
        let mut output = 0;
        for rating in self.joltage_ratings.iter() {
            // find the largest number that's not at the end
            let (idx, largest_digit) = rating
                .iter()
                .enumerate()
                .take(rating.len() - 1)
                .max_by(|a, b| {
                    match a.1.cmp(b.1) {
                        // If we have a tie of ratings, we want the FIRST instance
                        // of that tie, not the LAST (last is what the rust stdlib
                        // defaults to).
                        Ordering::Equal => b.0.cmp(&a.0),
                        o => o,
                    }
                })
                .unwrap();
            // find the next largest number
            let next_largest = rating.iter().skip(idx + 1).max().unwrap();
            output += largest_digit * 10 + next_largest
        }
        output.into()
    }

    fn part2(&mut self) -> Solution {
        let mut output = 0;
        for rating in self.joltage_ratings.iter() {
            // The idea here follows by induction from the previous part.
            //
            // Let B represent our bank of batteries, where len(B) = N (i.e., we have N batteries).
            // If we need to pick X batteries such that the subsequence formed by those X batteries
            // forms the largest joltage, we need to do the following to pick the X batteries.
            //
            // While we still need to pick batteries (i.e., X > 0):
            // 1. Consider all available batteries EXCEPT for the last (X - 1) batteries. Note that
            //    if we instead said "last X batteries," there is a chance that we may not have
            //    enough batteries afterward to meet the X battery requirement (since this is a
            //    subsequence, so batteries need to be picked in order).
            //
            //    In other words, we want to look at Z = B[..len(B)-(X-1)].
            //
            // 2. Find the *first* battery with the LARGEST rating from the previous step. This
            //    is the battery that will be turned on. Let its index (relative to Z) be denoted
            //    I.
            //
            // 3. IGNORE every battery that came before the selected battery. Additionally, ignore
            //    the battery that was just powered on, since you cannot power a battery on twice.
            //    Now, you need to turn on X-1 batteries.
            //
            //    In other words, we basically reassign B with B[(I+1)..], since we no longer
            //    need the batteries that came before I and the battery at I (since that one has
            //    been turned on). Additionally, because we selected a battery to turn on, we need
            //    to now turn on X-1 batteries, so we basically reassign X with X-1.
            //
            // Let's take batteries = 818181911112111 as an example, and with X = 12 since we need
            // 12 batteries to be powered on. The below table demonstrates how we calculate what
            // batteries will be selected.
            //
            //                              Step#1      Step#2
            //   X      BATTERIES           ToConsider  SelectedBattery     PoweredOn
            //   12     818181911112111     8181        8 (idx=0)           8
            //   11     18181911112111      1818        8 (idx=1)           88
            //   10     181911112111        181         8 (idx=1)           888
            //    9     1911112111          19          9 (idx=1)           8889
            //    8     11112111            1           1 (idx=0)           88891
            //    7     1112111             1           1 (idx=0)           888911
            //    .
            //    .
            //    .
            let mut batteries: &[u32] = rating;
            let mut batteries_needed = 12;
            let mut res: usize = 0;
            while batteries_needed > 0 {
                // Step #1:
                let interval = &batteries[..batteries.len() - (batteries_needed - 1)];

                // Step #2: find the *first* biggest rating from this interval to take
                let mut biggest_num = u32::MIN;
                let mut biggest_idx = usize::MAX;
                for (idx, digit) in interval.iter().enumerate() {
                    if *digit > biggest_num {
                        biggest_num = *digit;
                        biggest_idx = idx;
                    }
                }

                // Step #3:
                batteries = &batteries[biggest_idx + 1..];
                batteries_needed -= 1;
                res = res * 10 + (biggest_num as usize);
            }

            output += res;
        }

        output.into()
    }

    fn day() -> u32 {
        3
    }

    fn year() -> u32 {
        2025
    }
}
