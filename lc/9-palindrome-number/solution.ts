function isPalindrome(x: number): boolean {
    if (x < 0) {
        return false;
    }

    let oldX = x;
    let reversed = 0;
    while (x > 0) {
        const digit = x % 10;
        x = Math.floor(x / 10);
        reversed = reversed * 10 + digit;
    }

    return oldX === reversed;
};

console.log(isPalindrome(121));
console.log(isPalindrome(-121));
console.log(isPalindrome(10));