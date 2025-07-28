const SYMBOL_TO_VAL: { [s: string]: number } = {
    "I": 1,
    "IV": 4,
    "V": 5,
    "IX": 9,
    "X": 10,
    "XL": 40,
    "L": 50,
    "XC": 90,
    "C": 100,
    "CD": 400,
    "D": 500,
    "CM": 900,
    "M": 1000
};

// LVIII
// L -> 50
// V -> 5
// I -> 1
// I -> 1
// I -> 1
//      = 58

// MCMXCIV
// M -> 1000
// CM -> 900
// XC -> 90
// ...

function romanToInt(s: string): number {
    let res = 0;
    let i = 0;
    while (i < s.length) {
        if (i + 1 < s.length && (s[i] + s[i + 1]) in SYMBOL_TO_VAL) {
            res += SYMBOL_TO_VAL[s[i] + s[i + 1]];
            i += 2;
            continue;
        }

        res += SYMBOL_TO_VAL[s[i]];
        i++;
    }

    return res;
};

console.log(romanToInt("III"));
console.log(romanToInt("LVIII"));
console.log(romanToInt("MCMXCIV"));