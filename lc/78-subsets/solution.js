/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    function generate(idx, arr, allArrays) {
        if (idx >= nums.length) {
            allArrays.push(arr);
            return;
        }

        // we can either take this element
        generate(idx + 1, [...arr, nums[idx]], allArrays);
        // or we can ditch this element
        generate(idx + 1, arr, allArrays);
    }

    const allArrs = [];
    generate(0, [], allArrs);
    return allArrs;
};

console.log(subsets([1, 2, 3]));
console.log(subsets([0]));