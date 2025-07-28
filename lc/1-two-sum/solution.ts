// [2, 7, 11, 15]       target = 9
// 9 - 2 = 7
// 9 - 7 = 2
// 9 - 11 = -2
// 9 - 15 = -6
//
// map:
//      2 -> [0]
//      7 -> [1]
//      11 -> [2]
//      15 -> [3]
//
// if 9 - val is in map:
//      return map[val], map[9 - val]
//
// ---
//
// [3, 3] target = 6
// 6 - 3 = 3
// map:
//      3: [0, 1]

function twoSum(nums: number[], target: number): number[] {
    const m: { [v: string]: number[]; } = {};
    for (let i = 0; i < nums.length; i++) {
        if (!(target - nums[i] in m)) {
            m[target - nums[i]] = [];
        }

        m[target - nums[i]].push(i);
    }

    for (const num of nums) {
        if (!(target - num in m) || !(num in m)) {
            continue;
        }

        // idx 1
        const idx1 = m[num].at(0)!;
        const idx2 = m[target - num].at(-1)!;
        if (idx1 === idx2) {
            continue;
        }

        return [idx1, idx2];
    }

    throw new Error("solution should exist");
};

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([3, 3], 6));
console.log(twoSum([2, 5, 5, 11], 10));

/*
function twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i === j) {
                continue;
            }

            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }

    throw new Error("solution should exist");
};
*/