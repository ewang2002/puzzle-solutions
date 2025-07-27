function lengthOfLongestSubstring(s: string): number {
    if (s.length === 0) {
        return 0;
    }

    const seenCounter: { [key: string]: number } = {};
    let count = 0;
    let longest = Number.MIN_VALUE;

    let l = 0;
    let r = 0;
    while (r < s.length) {
        if (!(s[r] in seenCounter)) {
            seenCounter[s[r]] = 0;
        }

        seenCounter[s[r]]++;

        // do we have two instances of this string?
        if (seenCounter[s[r]] > 1) {
            // if so, we need to move l until we no longer have two instances of this string
            while (l < r && seenCounter[s[r]] > 1) {
                seenCounter[s[l]]--;
                if (seenCounter[s[l]] === 0) {
                    delete seenCounter[s[l]];
                }

                count--;
                l++;
            }
        }

        count++;
        longest = Math.max(count, longest);
        r++;
    }

    return longest;
};

console.log(lengthOfLongestSubstring(""));
console.log(lengthOfLongestSubstring("a"));
console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));