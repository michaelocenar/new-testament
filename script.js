const correctBooks = {
  "matthew": ["matthew", "mt", "matt"],
  "mark": ["mark", "mk", "mrk"],
  "luke": ["luke", "lk", "luk"],
  "john": ["john", "jn", "jhn"],
  "acts": ["acts", "ac"],
  "romans": ["romans", "rom", "rm"],
  "1 corinthians": ["1 corinthians", "1 cor", "1co"],
  "2 corinthians": ["2 corinthians", "2 cor", "2co"],
  "galatians": ["galatians", "gal", "ga"],
  "ephesians": ["ephesians", "eph", "ep"],
  "philippians": ["philippians", "phil", "php"],
  "colossians": ["colossians", "col", "cl"],
  "1 thessalonians": ["1 thessalonians", "1 thess", "1th"],
  "2 thessalonians": ["2 thessalonians", "2 thess", "2th"],
  "1 timothy": ["1 timothy", "1 tim", "1ti"],
  "2 timothy": ["2 timothy", "2 tim", "2ti"],
  "titus": ["titus", "tit", "ti"],
  "philemon": ["philemon", "phm", "phl"],
  "hebrews": ["hebrews", "heb", "he"],
  "james": ["james", "jas", "jm"],
  "1 peter": ["1 peter", "1 pet", "1pe"],
  "2 peter": ["2 peter", "2 pet", "2pe"],
  "1 john": ["1 john", "1 jn", "1jn"],
  "2 john": ["2 john", "2 jn", "2jn"],
  "3 john": ["3 john", "3 jn", "3jn"],
  "jude": ["jude", "jd", "jde"],
  "revelation": ["revelation", "rev", "re", "apocalypse"],
};

let userBooks = [];
let mode = 'easy'; // Default mode
let timer;
let wrongGuesses = 0;

document.getElementById('bookInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addBook();
    }
});

document.getElementById('addBook').addEventListener('click', addBook);

document.getElementById('submit').addEventListener('click', submitQuiz);

document.getElementById('modeToggle').addEventListener('click', toggleMode);

function toggleMode() {
    if (mode === 'easy') {
        mode = 'hard';
        document.getElementById('timer').style.display = 'block';
        document.getElementById('modeToggle').textContent = 'Switch to Easy Mode';
        document.getElementById('modeToggle').classList.remove('hard-mode-btn');
        startTimer();
    } else {
        mode = 'easy';
        document.getElementById('timer').style.display = 'none';
        document.getElementById('modeToggle').textContent = 'Switch to Hard Mode';
        document.getElementById('modeToggle').classList.add('hard-mode-btn');
        if (timer) {
            clearInterval(timer);
        }
    }
}


function addBook() {
    const bookInput = document.getElementById('bookInput').value.toLowerCase().trim();
    if (userBooks.includes(bookInput)) {
        alert("You have already inputted this book.");
        return;
    }
    let validBook = false;
    for (let book in correctBooks) {
        if (correctBooks[book].includes(bookInput)) {
            userBooks.push(book);
            updateEnteredBooks();
            document.getElementById('bookInput').value = '';
            validBook = true;
            break;
        }
    }
    if (!validBook) {
        alert("That isn't an actual book of the New Testament.");
        if (hardMode) {
            wrongGuesses++;
        }
    }

    if (mode === 'hard' && userBooks.length === 1) {
      startTimer();
  }


    if (hardMode && userBooks.length === 1) {
        startTimer();
    }
}

function submitQuiz() {
    if (userBooks.length === 0 && !hardMode) {
        alert("Please input at least one book before submitting.");
        return;
    }
    const totalBooks = Object.keys(correctBooks).length;
    let score = userBooks.length - wrongGuesses;
    score = Math.max(score, 0); // Ensure score doesn't go below 0
    let missedBooks = Object.keys(correctBooks).filter(book => !userBooks.includes(book));
    
    let resultHTML = `<p>Your Score: ${score}/${totalBooks}</p>`;
    resultHTML += `<p>Books you entered: ${userBooks.map(book => capitalize(book)).join(", ")}</p>`;
    resultHTML += `<p>Books you missed: ${missedBooks.map(book => capitalize(book)).join(", ")}</p>`;

    document.getElementById('result').innerHTML = resultHTML;

    if (hardMode) {
        clearInterval(timer);
        hardMode = false;
        document.getElementById('timer').style.display = 'none';
        wrongGuesses = 0; // Reset wrong guesses for the next round
    }
}

function startTimer() {
    let timeLeft = 60;
    document.getElementById('timeLeft').textContent = timeLeft;
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function updateEnteredBooks() {
    let html = userBooks.map(book => `<span class="book">${capitalize(book)}</span>`).join("");
    document.getElementById('enteredBooks').innerHTML = html;
}

function capitalize(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}