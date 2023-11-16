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

document.getElementById('bookInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addBook();
    }
});

document.getElementById('addBook').addEventListener('click', addBook);

document.getElementById('submit').addEventListener('click', function() {
    const totalBooks = Object.keys(correctBooks).length;
    const score = userBooks.length;
    let missedBooks = Object.keys(correctBooks).filter(book => !userBooks.includes(book));
    
    let resultHTML = `<p>Your Score: ${score}/${totalBooks}</p>`;
    resultHTML += `<p>Books you entered: ${userBooks.map(book => capitalize(book)).join(", ")}</p>`;
    resultHTML += `<p>Books you missed: ${missedBooks.map(book => capitalize(book)).join(", ")}</p>`;

    document.getElementById('result').innerHTML = resultHTML;
});

function addBook() {
    const bookInput = document.getElementById('bookInput').value.toLowerCase().trim();
    let validBook = false;
    for (let book in correctBooks) {
        if (correctBooks[book].includes(bookInput) && !userBooks.includes(book)) {
            userBooks.push(book);
            updateEnteredBooks();
            document.getElementById('bookInput').value = '';
            validBook = true;
            break;
        }
    }
    if (!validBook) {
        alert("That isn't an actual book of the New Testament.");
    }
}

function updateEnteredBooks() {
    let html = userBooks.map(book => `<span class="book">${capitalize(book)}</span>`).join("");
    document.getElementById('enteredBooks').innerHTML = html;
}

function capitalize(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}