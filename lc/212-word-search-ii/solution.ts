const DIRECTIONS: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1]
];

function findWords(board: string[][], words: string[]): string[] {
    const foundWords = new Set<string>();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            search(board, words, "", i, j, new Set(), foundWords);
        }
    }

    return [...foundWords];
};

function prefixExists(words: string[], currWord: string): boolean {
    return words.some(x => x.startsWith(currWord));
}

function foundWord(words: string[], currWord: string): boolean {
    return words.some(x => x === currWord);
}

function search(board: string[][], words: string[], currWord: string, i: number, j: number, seen: Set<string>, foundWords: Set<string>) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
        return;
    }

    const coords = `${i} ${j}`;
    if (seen.has(coords)) {
        return;
    }

    seen.add(coords);
    currWord += board[i][j];
    if (foundWord(words, currWord)) {
        foundWords.add(currWord);
    }

    if (!prefixExists(words, currWord)) {
        return;
    }

    for (const [di, dj] of DIRECTIONS) {
        search(board, words, currWord, i + di, j + dj, new Set(seen), foundWords);
    }
}

console.log(findWords([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"]));
console.log(findWords([["a", "b"], ["c", "d"]], ["abcb"]));
console.log(findWords([["a", "b"]], ["a", "b"]));