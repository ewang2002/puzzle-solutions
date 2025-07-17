/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    /**
     * Determines the minimum number of coins needed to get the specified amount.
     * @param {number} amount The total amount of money.
     * @param {*} cache The cache used to store previous results.
     * @return {number} The minimum number of coins needed to reach the specified amount, or -1 if this isn't possible.
     */
    function rec(amount, cache) {
        if (amount === 0) {
            return 0;
        }

        if (amount < 0) {
            return -1;
        }

        if (amount in cache) {
            return cache[amount];
        }

        let minCoinsUsed = Number.MAX_VALUE;
        for (const coin of coins) {
            const res = rec(amount - coin, cache);
            if (res === -1) {
                continue;
            }

            minCoinsUsed = Math.min(res + 1, minCoinsUsed);
        }

        cache[amount] = minCoinsUsed === Number.MAX_VALUE ? -1 : minCoinsUsed;
        return cache[amount];
    }

    coins = coins.sort((a, b) => b - a);
    const res = rec(amount, {});
    return res;
};

console.log(coinChange([1, 2, 5], 11));
console.log(coinChange([2], 3));
console.log(coinChange([1], 0));
