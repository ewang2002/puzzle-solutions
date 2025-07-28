const SYMBOL_TO_VAL: { [v: string]: string; } = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M"
};

// 3749
// -> [9, 4, 7, 3]
// -> 9 -> IX
// -> 40 -> XL
// -> 700 -> DCC
// -> 3000 -> MMM
// MMM DCC XL IX

// D is the number of digits
// runtime: O(2D) = O(D)
function intToRoman(num: number): string {
    // step 1: break up the numbers into individual digits
    const digits: number[] = [];
    while (num > 0) { // O(D)
        digits.push(num % 10);
        num = Math.floor(num / 10);
    }

    // step 2: find roman numeral equivalent for each digit
    const romanNumerals: string[] = [];
    for (let power = 0; power < digits.length; power++) { // O(D)
        let numToWorkWith = digits[power] * (10 ** power);
        if (numToWorkWith in SYMBOL_TO_VAL) {
            romanNumerals.push(SYMBOL_TO_VAL[numToWorkWith]);
            continue;
        }

        // determine if this number is greater than 5 * (10 ** power)
        let s = "";
        if (numToWorkWith > 5 * (10 ** power)) {
            s += SYMBOL_TO_VAL[5 * (10 ** power)];
            numToWorkWith -= 5 * (10 ** power);
        }

        // Now that we know that this number is less than 5 * (10 ** power),
        // keep subtracting off 1 * (10 ** power)
        while (numToWorkWith > 0) {
            numToWorkWith -= 10 ** power;
            s += SYMBOL_TO_VAL[10 ** power];
        }

        romanNumerals.push(s);
    }

    return romanNumerals.reverse().join("");
};

console.log(intToRoman(3749));
console.log(intToRoman(58));
console.log(intToRoman(1994));