function reverse(x: number): number {
    const isNeg = x < 0;
    x = Math.abs(x);
    let reversedNum = 0;
    while (x > 0) {
        const digit = x % 10;
        x = Math.floor(x / 10);
        reversedNum = reversedNum * 10 + digit;
    }

    reversedNum *= (isNeg ? -1 : 1);
    if (reversedNum < -(2**31) || reversedNum > 2**31 - 1) {
        return 0;
    }

    return reversedNum;
};

console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(120));