function maxArea(height: number[]): number {
    let mostWater = -1;
    let left = 0;
    let right = height.length - 1;
    while (left < right) {
        mostWater = Math.max(mostWater, (right - left) * Math.min(height[left], height[right]));

        // Figure out which direction (left + 1 or right - 1) will result in the biggest gain
        // if we move left...
        if (height[left] < height[right]) {
            left++;
        }
        else {
            right--;
        }
    }

    return mostWater;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea([1, 1]));
console.log(maxArea([1, 2, 3, 1000, 9]));
console.log(maxArea([5, 2, 8, 7, 55, 44, 1, 1]));

/*
function maxArea(height: number[]): number {
    let mostWater = -1;
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            mostWater = Math.max(mostWater, (j - i) * Math.min(height[i], height[j]));
        }
    }

    return mostWater;
};
*/