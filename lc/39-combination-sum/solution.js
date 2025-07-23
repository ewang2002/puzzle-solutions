/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    const s = (idx, amt, list, finalList) => {
        if (amt === target) {
            finalList.push([...list]);
            return;
        }

        if (amt > target || idx >= candidates.length) {
            return;
        }

        // either we can take this element
        list.push(candidates[idx]);
        s(idx, amt + candidates[idx], list, finalList);
        list.pop();

        // or we can skip this element and move to next
        s(idx + 1, amt, list, finalList);
    };

    const finalList = [];
    s(0, 0, [], finalList);
    return finalList;
};

console.log(combinationSum([2, 3, 6, 7], 7));
console.log(combinationSum([2, 3, 5], 8));
console.log(combinationSum([2], 1));