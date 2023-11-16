document.getElementById('submit').addEventListener('click', function() {
  const correctBooks = ["matthew", "mark", "luke", "john", "acts", "romans", 
      "1 corinthians", "2 corinthians", "galatians", "ephesians", "philippians", 
      "colossians", "1 thessalonians", "2 thessalonians", "1 timothy", "2 timothy", 
      "titus", "philemon", "hebrews", "james", "1 peter", "2 peter", "1 john", 
      "2 john", "3 john", "jude", "revelation"];
  const userInput = document.getElementById('userInput').value.toLowerCase();
  
  // Split the user input by various separators
  const separators = [',', '\n', ' ']; // Add more separators if needed
  const regex = new RegExp('[' + separators.join('') + ']+');
  const userBooks = userInput.split(regex).map(book => book.trim()).filter(book => book);

  const correctAnswers = userBooks.filter(book => correctBooks.includes(book));
  const missedBooks = correctBooks.filter(book => !userBooks.includes(book));
  const score = correctAnswers.length;
  
  let resultHTML = `<p>Your Score: ${score}/${correctBooks.length}</p>`;
  resultHTML += `<p>Correct Books: ${correctAnswers.join(", ")}</p>`;
  resultHTML += `<p>Books you missed: ${missedBooks.join(", ")}</p>`;

  document.getElementById('result').innerHTML = resultHTML;
});
