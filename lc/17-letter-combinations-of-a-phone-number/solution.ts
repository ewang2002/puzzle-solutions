const MAPPING: { [l: string]: string[] } = {
    "2": "abc".split(""),
    "3": "def".split(""),
    "4": "ghi".split(""),
    "5": "jkl".split(""),
    "6": "mno".split(""),
    "7": "pqrs".split(""),
    "8": "tuv".split(""),
    "9": "wxyz".split("")
};

function letterCombinations(digits: string): string[] {
    function generate(idx: number, currCombo: string[], combinations: string[]): void {
        if (idx >= digits.length) {
            if (currCombo.length !== 0) {
                combinations.push(currCombo.join(""));
            }

            return;
        }

        if (!(digits[idx] in MAPPING)) {
            return;
        }

        for (const letter of MAPPING[digits[idx]]) {
            currCombo.push(letter);
            generate(idx + 1, currCombo, combinations);
            currCombo.pop();
        }
    }

    const arr = [];
    generate(0, [], arr);
    return arr;
};

console.log(letterCombinations("23"));
console.log(letterCombinations(""));
console.log(letterCombinations("2"));
console.log(letterCombinations("125"));