document.addEventListener('DOMContentLoaded', () => {
  const lexiconList = document.getElementById('lexicon');

  // Check if lexiconList is found
  if (!lexiconList) {
    console.error('Element with id "lexicon" not found.');
    return;
  }

  // Define the order of grammatical terms
  const grammaticalOrder = ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'suffix','conjunction', 'interjection'];

  // Function to save lexicon entries to localStorage
  function saveLexiconEntries(entries) {
    localStorage.setItem('lexiconEntries', JSON.stringify(entries));
  }

  // Function to display lexicon entries
  function displayLexicon() {
    // Retrieve lexicon entries from localStorage or initialize as an empty array
    let lexiconEntries = JSON.parse(localStorage.getItem('lexiconEntries')) || [];

    // Ensure every entry has a grammar property
    lexiconEntries = lexiconEntries.map(entry => {
      if (typeof entry === 'string') {
        return {
          term: entry,
          grammar: '', // Default grammar
          definition: '', // Default definition
          additionalInfo: '' // Default additional info
        };
      }
      return {
        term: entry.term || '', // Ensure term is present
        grammar: entry.grammar || '', // Ensure grammar is present
        definition: entry.definition || '', // Ensure definition is present
        additionalInfo: entry.additionalInfo || '' // Ensure additional info is present
      };
    });

    // Sort entries based on the defined grammatical order
    lexiconEntries.sort((a, b) => {
      const grammarA = a.grammar; // No conversion to lowercase
      const grammarB = b.grammar; // No conversion to lowercase

      const indexA = grammaticalOrder.indexOf(grammarA.toLowerCase()); // Convert for comparison
      const indexB = grammaticalOrder.indexOf(grammarB.toLowerCase()); // Convert for comparison

      // Handle cases where the grammar term is not in the predefined order
      if (indexA === -1) return 1; // Place unknown grammar terms at the end
      if (indexB === -1) return -1; // Place unknown grammar terms at the end

      return indexA - indexB;
    });

    // Clear any existing content in the ul element
    lexiconList.innerHTML = '';

    // Create and insert the header row
    const headerRow = document.createElement('li');
    headerRow.className = 'header-row';
    headerRow.innerHTML = `
      <div class="header-item"></div>
      <div class="header-item">WORD</div>
      <div class="header-item">GRAMMATICAL TERM</div>
      <div class="header-item">DEFINITION</div>
      <div class="header-item">ADDITIONAL INFORMATION</div>
    `;
    lexiconList.appendChild(headerRow);

    // Check if there are entries to display
    if (lexiconEntries.length === 0) {
      console.log('No lexicon entries to display.');
      return;
    }

    // Iterate over each entry in the lexiconEntries array
    lexiconEntries.forEach((entry, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'lexicon-item'; // Add a class for styling

      // Create and set up the div for the delete button (first column)
      const deleteButtonContainer = document.createElement('div');
      deleteButtonContainer.className = 'delete-container';

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.className = 'delete-button';

      // Add an event listener to delete the entry when the button is clicked
      deleteButton.addEventListener('click', () => {
        lexiconEntries.splice(index, 1); // Remove the entry from the array
        saveLexiconEntries(lexiconEntries); // Save updated entries to localStorage
        displayLexicon(); // Re-render the lexicon list
      });

      deleteButtonContainer.appendChild(deleteButton);

      // Create and set up the div for the term (second column)
      const termItem = document.createElement('div');
      termItem.className = 'term-item';
      termItem.textContent = entry.term;

      // Create and set up the div for the grammar (third column)
      const grammarItem = document.createElement('div');
      grammarItem.className = 'grammar-item';
      grammarItem.contentEditable = 'true';
      grammarItem.textContent = entry.grammar || 'Enter Grammar';

      // Add an event listener to save changes when the user finishes editing
      grammarItem.addEventListener('blur', (event) => {
        const updatedGrammar = event.target.textContent.trim();
        if (updatedGrammar !== entry.grammar) {
          entry.grammar = updatedGrammar; // Update the entry's grammar
          saveLexiconEntries(lexiconEntries); // Save updated entries to localStorage
        }
      });

      // Create and set up the div for the definition (fourth column)
      const definitionItem = document.createElement('div');
      definitionItem.className = 'definition-item';
      definitionItem.contentEditable = 'true';
      definitionItem.textContent = entry.definition || 'Enter a Definition';

      // Add an event listener to save changes when the user finishes editing
      definitionItem.addEventListener('blur', (event) => {
        const updatedDefinition = event.target.textContent.trim();
        if (updatedDefinition !== entry.definition) {
          entry.definition = updatedDefinition; // Update the entry's definition
          saveLexiconEntries(lexiconEntries); // Save updated entries to localStorage
        }
      });

      // Create and set up the div for the additional info (fifth column)
      const additionalInfoItem = document.createElement('div');
      additionalInfoItem.className = 'additional-info-item';
      additionalInfoItem.contentEditable = 'true';
      additionalInfoItem.textContent = entry.additionalInfo || 'Enter Additional Info';

      // Add an event listener to save changes when the user finishes editing
      additionalInfoItem.addEventListener('blur', (event) => {
        const updatedAdditionalInfo = event.target.textContent.trim();
        if (updatedAdditionalInfo !== entry.additionalInfo) {
          entry.additionalInfo = updatedAdditionalInfo; // Update the entry's additional info
          saveLexiconEntries(lexiconEntries); // Save updated entries to localStorage
        }
      });

      // Append the delete button, term, grammar, definition, and additional info to the list item
      listItem.appendChild(deleteButtonContainer);
      listItem.appendChild(termItem);
      listItem.appendChild(grammarItem);
      listItem.appendChild(definitionItem);
      listItem.appendChild(additionalInfoItem);

      // Append the list item to the ul element
      lexiconList.appendChild(listItem);
    });
  }

  // Initial display of lexicon entries
  displayLexicon();
});
