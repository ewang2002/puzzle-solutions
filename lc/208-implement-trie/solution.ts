type LetterNode = {
    next: { [letter: string]: LetterNode };
    isEnd: boolean;
};

class Trie {
    private _node: LetterNode;

    constructor() {
        this._node = {
            next: {},
            isEnd: false
        }; 
    }

    insert(word: string): void {
        let node = this._node;
        for (let i = 0; i < word.length; i++) {
            if (!(word[i] in node.next)) {
                node.next[word[i]] = { next: {}, isEnd: false };
            }

            node = node.next[word[i]];
        }

        node.isEnd = true;
    }

    search(word: string): boolean {
        let node = this._node;
        for (let i = 0; i < word.length; i++) {
            if (!(word[i] in node.next)) {
                return false;
            }

            node = node.next[word[i]];
        }

        return node.isEnd;
    }

    startsWith(prefix: string): boolean {
        let node = this._node;
        for (let i = 0; i < prefix.length; i++) {
            if (!(prefix[i] in node.next)) {
                return false;
            }

            node = node.next[prefix[i]];
        }

        return true;
    }
}

const t = new Trie();
t.insert("apple");
console.log(t.search("apple"));
console.log(t.search("app"));
console.log(t.startsWith("app"));
t.insert("app");
console.log(t.search("app"));