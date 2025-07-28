// flower

function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return "";
    }

    let longest = strs[0].split("");
    for (let i = 1; i < strs.length; i++) {
        const thisWord = strs[i].split("");

        let j = 0;
        for (; j < Math.min(longest.length, thisWord.length); j++) {
            if (longest[j] !== thisWord[j]) {
                break;
            }
        }

        for (let k = longest.length - 1; k >= j; k--) {
            longest.pop();
        }
    }

    return longest.join("");
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));