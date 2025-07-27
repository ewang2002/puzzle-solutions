function build(reference: string, startStr: string, left: number, right: number): string {
    // see how much we can keep adding on left and right side until we no longer get a palindrome
    while (left >= 0 && right < reference.length) {
        if (reference[left] !== reference[right]) {
            break;
        }

        startStr = reference[left] + startStr + reference[right];
        left--;
        right++;
    }

    return startStr;
}

function longestPalindrome(s: string): string {
    if (s.length === 1) {
        return s;
    }

    let longestSs = "";
    // We have two cases to consider: either the palindrome has an even length or odd length.
    // For example, 
    // - [s1] for an odd length case like 'racecar', we would pick a single letter and expand on that
    //   single letter. 
    // - [s2] for an even length case like 'hbbh', we can start with no characters, and then expand
    //   by starting with two adjacent characters (like bb) and expanding outwards.
    for (let i = 0; i < s.length; i++) {
        const s1 = build(s, s[i], i - 1, i + 1);
        const s2 = build(s, "", i, i + 1);

        if (s1.length > longestSs.length) {
            longestSs = s1;
        }

        if (s2.length > longestSs.length) {
            longestSs = s2;
        }
    }

    return longestSs;
};

console.log(longestPalindrome("a"));
console.log(longestPalindrome("bb"));
console.log(longestPalindrome("ccc"));
console.log(longestPalindrome("ccabdccc"));
console.log(longestPalindrome("babad"));
console.log(longestPalindrome("cbbd"));
console.log(longestPalindrome("pxtracecarlx"));
console.log(longestPalindrome("0000"));
console.log(longestPalindrome("zudfweormatjycujjirzjpyrmaxurectxrtqedmmgergwdvjmjtstdhcihacqnothgttgqfywcpgnuvwglvfiuxteopoyizgehkwuvvkqxbnufkcbodlhdmbqyghkojrgokpwdhtdrwmvdegwycecrgjvuexlguayzcammupgeskrvpthrmwqaqsdcgycdupykppiyhwzwcplivjnnvwhqkkxildtyjltklcokcrgqnnwzzeuqioyahqpuskkpbxhvzvqyhlegmoviogzwuiqahiouhnecjwysmtarjjdjqdrkljawzasriouuiqkcwwqsxifbndjmyprdozhwaoibpqrthpcjphgsfbeqrqqoqiqqdicvybzxhklehzzapbvcyleljawowluqgxxwlrymzojshlwkmzwpixgfjljkmwdtjeabgyrpbqyyykmoaqdambpkyyvukalbrzoyoufjqeftniddsfqnilxlplselqatdgjziphvrbokofvuerpsvqmzakbyzxtxvyanvjpfyvyiivqusfrsufjanmfibgrkwtiuoykiavpbqeyfsuteuxxjiyxvlvgmehycdvxdorpepmsinvmyzeqeiikajopqedyopirmhymozernxzaueljjrhcsofwyddkpnvcvzixdjknikyhzmstvbducjcoyoeoaqruuewclzqqqxzpgykrkygxnmlsrjudoaejxkipkgmcoqtxhelvsizgdwdyjwuumazxfstoaxeqqxoqezakdqjwpkrbldpcbbxexquqrznavcrprnydufsidakvrpuzgfisdxreldbqfizngtrilnbqboxwmwienlkmmiuifrvytukcqcpeqdwwucymgvyrektsnfijdcdoawbcwkkjkqwzffnuqituihjaklvthulmcjrhqcyzvekzqlxgddjoir"));


/*
function longestPalindrome(s: string): string {
    return findBiggestString(s, {}) ?? "";
};

function findBiggestString(s: string, cache: { [key: string]: string | null }): string | null {
    if (s in cache) {
        return cache[s];
    }

    if (isPalindrome(s)) {
        return s;
    }

    const takeFirst = findBiggestString(s.substring(1), cache);
    const takeLast = findBiggestString(s.substring(0, s.length - 1), cache);
    if (takeFirst === null && takeLast === null) {
        cache[s] = null;
    }
    else if (takeFirst !== null && takeLast !== null) {
        cache[s] = takeFirst.length > takeLast.length
            ? takeFirst
            : takeLast;
    }
    else if (takeFirst === null) {
        cache[s] = takeLast;
    }
    else {
        cache[s] = takeFirst;
    }

    return cache[s];
}

function isPalindrome(s: string): boolean {
    let l = 0;
    let r = s.length - 1;
    while (l < s.length / 2) {
        if (s[l] !== s[r]) {
            return false;
        }

        l++;
        r--;
    }

    return true;
}
    */