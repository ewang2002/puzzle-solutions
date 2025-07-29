function maxProfit(prices: number[]): number {
    let buyIdx = 0;
    let sellIdx = 1;

    let maxProfit = 0;
    while (sellIdx < prices.length) {
        const thisProfit = prices[sellIdx] - prices[buyIdx];
        maxProfit = Math.max(maxProfit, thisProfit);
        if (thisProfit > 0) {
            sellIdx++;
        }
        else {
            buyIdx = sellIdx;
            sellIdx++;
        }
    }

    return maxProfit;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));