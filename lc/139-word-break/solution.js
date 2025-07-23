/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    function buildWord(currWord, cache) {
        if (currWord in cache) {
            return cache[currWord];
        }

        if (!s.startsWith(currWord)) {
            return false;
        }

        if (s === currWord) {
            return true;
        }

        if (currWord.length >= s.length) {
            return false;
        }

        for (const word of wordDict) {
            if (!buildWord(currWord + word, cache)) {
                continue;
            }

            cache[currWord + word] = true;
            return true;
        }

        cache[currWord] = false;
        return false;
    }

    const cache = {};
    for (const word of wordDict) {
        if (buildWord(word, cache)) {
            return true;
        }
    }

    return false;
};

console.log(wordBreak("leetcode", ["leet", "code"]));
console.log(wordBreak("applepenapple", ["apple", "pen"]));
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));