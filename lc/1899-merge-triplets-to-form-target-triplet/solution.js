/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function (triplets, target) {
    let t1 = false;
    let t2 = false;
    let t3 = false;

    for (const [a, b, c] of triplets) {
        if (a > target[0] || b > target[1] || c > target[2]) {
            continue;
        }

        if (a === target[0]) t1 = true;
        if (b === target[1]) t2 = true;
        if (c === target[2]) t3 = true;

        if (t1 && t2 && t3) {
            break;
        }
    }

    return t1 && t2 && t3;
};

console.log(mergeTriplets([[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5]));
console.log(mergeTriplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5]));
console.log(mergeTriplets([[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5]));