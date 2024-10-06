function crosswordSolver(Puzzle, words) {
    if (checkerror(Puzzle, words)) {
        console.log("Error");
        return;
    }

    let board = Puzzle.split("\n").map(row => row.split(''));
    let board2 = board.map(row => [...row])
    const wordStartTracker = {}, wordStartTracker2 = {};

    // Initialize tracker from board
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (!isNaN(board[i][j]) && parseInt(board[i][j]) > 0) {
                if (parseInt(board[i][j]) > 2)  {

                    console.log("Error"); return
                }       
                wordStartTracker[`${i},${j}`] = parseInt(board[i][j]);
                wordStartTracker2[`${i},${j}`] = parseInt(board[i][j]);
            }
        }
    }
    console.log(wordStartTracker);
    placeWords(board, words, wordStartTracker);
    console.log(printPuzzle(board))
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

const canPlaceHorizontally = (board, word, row, col, tracker) => {
    // Check if word fits within board
    if (col + word.length > board[0].length) return false;

    // Check if we can start a word here
    const key = `${row},${col}`;

    // If this isn't a valid start position or no more words can start here
    if ((board[row][col] === '.' && parseInt(board[row][col]) === 0) || tracker[[key]]  === 0) {
        return false;
    }

    // Check for conflicts with existing letters and dots
    for (let i = 0; i < word.length; i++) {
        const cell = board[row][col + i];
        if (cell === '.') return false;
        if (isNaN(cell) && cell !== word[i]) return false;
    }
    return true;
}

const canPlaceVertically = (board, word, row, col, tracker) => {
    // Check if word fits within board
    if (row + word.length > board.length) return false;

    // Check if we can start a word here
    const key = `${row},${col}`;

    // If this isn't a valid start position or no more words can start here
    if ((board[row][col] === '.' && parseInt(board[row][col]) === 0) || tracker[key] === 0) {
        return false;
    }

    // Check for conflicts with existing letters and dots
    for (let i = 0; i < word.length; i++) {
        const cell = board[row + i][col];
        if (cell === '.') return false;
        if (isNaN(cell) && cell !== word[i]) return false;
    }
    return true;
}

const placeWordHorizontally = (board, word, row, col, tracker) => {
    // Decrement the word start counter for this position
    const key = `${row},${col}`;
    if (tracker[key]) {
        tracker[key]--;
    }
    // Place the word in the board
    for (let i = 0; i < word.length; i++) {
        board[row][col + i] = word[i];
    }
}

const placeWordVertically = (board, word, row, col, tracker) => {
    // Decrement the word start counter for this position
    const key = `${row},${col}`;
    if (tracker[key]) {
        tracker[key]--;
    }
    // Place the word in the board
    for (let i = 0; i < word.length; i++) {
        board[row + i][col] = word[i];
    }
}

const saveState = (board, tracker) => {
    return {
        board: board.map(row => [...row]),
        tracker: { ...tracker }
    };
}

const restoreState = (board, tracker, state) => {
    // Restore board
    for (let i = 0; i < board.length; i++) {
        board[i] = [...state.board[i]];
    }
    Object.keys(tracker).forEach(key => {
        tracker[key] = state.tracker[key];
    });
}

const placeWords = (board, words, tracker, index = 0) => {
    // Base case: all words placed
    if (index === words.length) return true;
    const word = words[index];
    for (let key in tracker) {
            // Split the key by comma to get row and column
            const [row, col] = key.split(',').map(Number); // Convert to numbers

            // Try horizontal placement
            if (canPlaceHorizontally(board, word, row, col, tracker)) {
                const state = saveState(board, tracker);
                placeWordHorizontally(board, word, row, col, tracker);
                if (placeWords(board, words, tracker, index + 1)) {
                    return true;
                }
                restoreState(board, tracker, state);
            }

            // Try vertical placement
            if (canPlaceVertically(board, word, row, col, tracker)) {
                const state = saveState(board, tracker);
                placeWordVertically(board, word, row, col, tracker);
                if (placeWords(board, words, tracker, index + 1)) {
                    return true;
                }
                restoreState(board, tracker, state);
            }
        // }
    }
    return false;
}

const printPuzzle = board => {
    return board.map(row => row.join('')).join('\n');
}

const puzzle = `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
....0..0...
..100000...
....0..0...
....0......`
const words = [
  'popcorn',
  'fruit',
  'flour',
  'chicken',
  'eggs',
  'vegetables',
  'pasta',
  'pork',
  'steak',
  'cheese',
]
crosswordSolver(puzzle, words);
