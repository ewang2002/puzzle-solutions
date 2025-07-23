/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    function robHouse(idx, cache) {
        if (idx in cache) {
            return cache[idx];
        }

        let m = 0;
        for (let i = idx + 2; i < nums.length; i++) {
            m = Math.max(m, robHouse(i, cache));
        }

        cache[idx] = m + nums[idx];
        return cache[idx];
    }

    let m = 0;
    for (let i = 0; i < nums.length; i++) {
        m = Math.max(m, robHouse(i, {}));
    }

    return m;
};

console.log(rob([1, 2, 3, 1]));
console.log(rob([2, 7, 9, 3, 1]));