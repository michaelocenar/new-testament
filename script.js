document.getElementById('submit').addEventListener('click', function() {
  const correctBooks = ["Matthew", "Mark", "Luke", "John", "Acts", "Romans", 
      "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", 
      "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", 
      "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", 
      "2 John", "3 John", "Jude", "Revelation"];
  const userInput = document.getElementById('userInput').value;
  const userBooks = userInput.split(/,|\n/).map(book => book.trim()).filter(book => book);

  const correctAnswers = userBooks.filter(book => correctBooks.includes(book));
  const missedBooks = correctBooks.filter(book => !userBooks.includes(book));
  const score = correctAnswers.length;
  
  let resultHTML = `<p>Your Score: ${score}/${correctBooks.length}</p>`;
  resultHTML += `<p>Correct Books: ${correctAnswers.join(", ")}</p>`;
  resultHTML += `<p>Books you missed: ${missedBooks.join(", ")}</p>`;

  document.getElementById('result').innerHTML = resultHTML;
});
