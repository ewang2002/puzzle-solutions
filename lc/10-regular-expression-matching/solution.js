// .
const ANY = "match_any";
// a
const MATCH_SINGLE = "match_single";
// zero or many (*)
const ZERO_OR_MANY = "zero_or_many"

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    // first, let's parse p into something that's easier to understand
    const pattern = [];
    let i = 0;
    while (i < p.length) {
        if (p[i] === "*") {
            throw new Error("nothing to match against");
        }

        // otherwise, assume we're matching a letter
        if (i + 1 < p.length && p[i + 1] === "*") {
            pattern.push([ZERO_OR_MANY, p[i] === "." ? ANY : p[i]]);
            i += 2;
            continue;
        }

        pattern.push([MATCH_SINGLE, p[i] === "." ? ANY : p[i]]);
        i += 1;
        continue;
    }

    // See if we can consolidate the patterns
    for (let i = 0; i < pattern.length - 1; i++) {
        const [cp, ca] = pattern[i];
        const [np, na] = pattern[i + 1];
        if (cp === np && ca === na && cp === ZERO_OR_MANY) {
            pattern.splice(i, 1);
            i--;
        }
    }

    return matchPattern(s, pattern, 0, 0);
};

function matchPattern(s, patterns, sidx, pidx) {
    // If the ENTIRE pattern has been satisfied, then we can check if the string
    // itself has been covered
    if (sidx >= s.length && pidx >= patterns.length) {
        return true;
    }

    if (pidx >= patterns.length) {
        return false;
    }

    // Otherwise, let's consider the next pattern
    const [patternType, toMatch] = patterns[pidx];

    // If this is a single match...
    if (patternType === MATCH_SINGLE) {
        if (sidx >= s.length) {
            return false;
        }
        // If they can match any letter, then we can just move on to the next
        // character.
        if (toMatch === ANY) {
            return matchPattern(s, patterns, sidx + 1, pidx + 1);
        }

        // Otherwise, we have a specific character to match against. If they match,
        // move on to the next character.
        if (toMatch === s[sidx]) {
            return matchPattern(s, patterns, sidx + 1, pidx + 1);
        }

        // Otherwise, this does not match
        return false;
    }

    // Otherwise, we have zero or more matches to consider.
    // Case 1: this pattern doesn't match anything, move on to the next pattern
    let res = matchPattern(s, patterns, sidx, pidx + 1);

    // Case 2: this pattern does match on something, so we can stay on this pattern and move to the
    // next character
    if (sidx < s.length && (toMatch === ANY || toMatch === s[sidx])) {
        res ||= matchPattern(s, patterns, sidx + 1, pidx) || matchPattern(s, patterns, sidx + 1, pidx + 1);
    }

    return res;
}

console.log(isMatch("aa", "a"));
console.log(isMatch("aa", "a*"));
console.log(isMatch("ab", ".*"));