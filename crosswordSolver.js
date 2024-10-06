function crosswordSolver(emptyPuzzle, words) {
    if (checkerror(emptyPuzzle, words)) {
        console.log("Error");
        return;
    }

    let splitedemptyPuzzle = emptyPuzzle.split("\n");
    const LEN = splitedemptyPuzzle.length;
    console.log(LEN);
    console.log(splitedemptyPuzzle);
    // need to create a function which will do the back tracking
}

function checkerror(emptyPuzzle, words) {
    const regex = /^[0-9.\n]*$/;
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
const emptyPuzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(emptyPuzzle, words)