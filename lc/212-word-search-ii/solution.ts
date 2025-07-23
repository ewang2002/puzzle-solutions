const DIRECTIONS: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1]
];

function findWords(board: string[][], words: string[]): string[] {
    const mapping = createMap(words);
    const foundWords = new Set<string>();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            search(board, words, "", i, j, foundWords, mapping);
        }
    }

    return [...foundWords];
}

type LetterNeighborType = { neighbors: { [letter: string]: LetterNeighborType }; isEnd: boolean; };
function createMap(words: string[]): LetterNeighborType {
	function processWord(currWord: string, map: LetterNeighborType) {
		if (currWord.length === 0) {
			map.isEnd = true;
			return;
		}

		const thisLetter = currWord[0];
		if (!(thisLetter in map.neighbors)) {
			map.neighbors[thisLetter] = { neighbors: {}, isEnd: false }
		}

		return processWord(currWord.substring(1), map.neighbors[thisLetter]);
	}

	const map: LetterNeighborType = {
		neighbors: {},
		isEnd: false
	};

	for (const word of words) {
		processWord(word, map);
	}

	return map;
}

function search(board: string[][], words: string[], currWord: string, i: number, j: number, foundWords: Set<string>, wordMap: LetterNeighborType) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
        return;
    }

    if (!(board[i][j] in wordMap.neighbors)) {
        return;
    }

    if (board[i][j] === "@") {
        return;
    }

    const currLetterInfo = wordMap.neighbors[board[i][j]];

    currWord += board[i][j];

    if (currLetterInfo.isEnd) {
        foundWords.add(currWord);
    }

    const old = board[i][j];

    // Doing this is fine because as we explore a path, we keep modifying the board. HOWEVER, once we backtrack, we
    // end up modifying each square to its original, so that after the recursive call is done, the board is back to
    // its original state
    board[i][j] = "@";
    for (const [di, dj] of DIRECTIONS) {
        search(board, words, currWord, i + di, j + dj, foundWords, currLetterInfo);
    }

    board[i][j] = old;
}

console.log(findWords([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"]));
console.log(findWords([["a", "b"], ["c", "d"]], ["abcb"]));
console.log(findWords([["a", "b"]], ["a", "b"]));