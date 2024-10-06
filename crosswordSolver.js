function crosswordSolver(emptyPuzzle, words) {
    if (checkerror(emptyPuzzle, words)) {
        console.log("Error");
        return;
    }
    let splitedemptyPuzzle = emptyPuzzle.split("\n");
    const LEN = splitedemptyPuzzle.length;
    Solving(splitedemptyPuzzle, LEN, words, 0);
}
function Solving(Tab, LEN, words, index) {
    if (index >= words.length) {
        let tab = [];
        for (let i = 0; i < LEN; i++) {
            tab.push(Tab[i]);
        }
        if (containsNoNumbers(tab)) {
            console.log(tab.join("\n"))
        }
        return;
    }
    const word = words[index];
    for (let i = 0; i < LEN; i++) {
        for (let j = 0; j < Tab[i].length; j++) {
            if (CanPlaceH(i, j, Tab, word)) {
                const Ntab = Place(i, j, Tab, word, "Horizontal");
                if (Solving(Ntab, LEN, words, index + 1)) {
                    return true; // Return true if a valid solution is found
                }
            }
            if (CanPlaceV(i, j, Tab, word)) {
                const Ntab = Place(i, j, Tab, word, "Vertical");
                Solving(Ntab, LEN, words, index + 1);
            }
        }
    }
}
function CanPlaceV(x, y, grid, word) {
    const len = word.length;
    for (let i = 0; i < len; i++) {
        if (x + i >= grid.length || (!/\d/.test(grid[x + i][y]) && grid[x + i][y] !== word[i])) {
            return false;
        }
    }
    return true;
}
function CanPlaceH(x, y, grid, word) {
    const len = word.length;
    for (let i = 0; i < len; i++) {
        if (y + i >= grid[x].length || (!/\d/.test(grid[x][y + i]) && grid[x][y + i] !== word[i])) {
            return false;
        }
    }
    return true;
}
function Place(row, col, Tab, word, direction) {
    const Ntab = [...Tab];
    if (direction === "Vertical") {
        for (let i = 0; i < word.length; i++) {
            Ntab[row + i] = Ntab[row + i].slice(0, col) + word[i] + Ntab[row + i].slice(col + 1);
        }
    } else if (direction === "Horizontal") {
        for (let i = 0; i < word.length; i++) {
            Ntab[row] = Ntab[row].slice(0, col) + word + Ntab[row].slice(col + word.length);
        }
    }
    return Ntab;
}

function checkerror(emptyPuzzle, words) {
    if (words.length == 0 || typeof (emptyPuzzle) !== "string" || emptyPuzzle.length === 0 || !Array.isArray(words)) {
        return true
    }
    const regex = /^[0-2.\n]*$/;
    const puzzlerr = !regex.test(emptyPuzzle);
    const wordserr = hasDuplicateWord(words);
    if (puzzlerr || wordserr) {
        return true;
    }
    return false;
}
function hasDuplicateWord(words) {
    const wordCount = {};
    for (const word of words) {
        if (wordCount[word]) {
            return true;  // Duplicate word found
        }
        wordCount[word] = true;
    }
    return false;
}
function containsNoNumbers(tab) {
    // Join the array into a string
    const joinedString = tab.join();

    // Check if the string contains any numbers using a regular expression
    return !/\d/.test(joinedString);
}
const emptyPuzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(emptyPuzzle, words)