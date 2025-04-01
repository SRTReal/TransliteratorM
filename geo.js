document.addEventListener('DOMContentLoaded', () => {
  const lexiconList = document.getElementById('lexicon');
  const entryForm = document.getElementById('entryForm');
  const termInput = document.getElementById('term');
  const grammarInput = document.getElementById('grammar');
  const definitionInput = document.getElementById('definition');
  const additionalInfoInput = document.getElementById('additionalInfo');

  // Unique key for this page's lexicon
  const localStorageKey = 'lexiconEntriesPage1'; // Change this key for different pages

  function loadLexiconEntries() {
      let lexiconEntries = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      lexiconEntries.forEach((entry, index) => {
          addEntryToList(entry, index);
      });
  }

  function saveLexiconEntries(entries) {
      localStorage.setItem(localStorageKey, JSON.stringify(entries));
  }

  function addEntryToList(entry, index) {
      const listItem = document.createElement('li');

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button'; // Added class to delete button
      deleteButton.addEventListener('click', () => {
          deleteEntry(index);
      });

      const termDiv = document.createElement('div');
      termDiv.className = 'item';
      termDiv.textContent = entry.term || 'No term';

      const grammarDiv = document.createElement('div');
      grammarDiv.className = 'item';
      grammarDiv.textContent = entry.grammar || 'No grammar';

      const definitionDiv = document.createElement('div');
      definitionDiv.className = 'item';
      definitionDiv.contentEditable = 'true';
      definitionDiv.textContent = entry.definition || 'Enter a Definition';

      definitionDiv.addEventListener('blur', (event) => {
          const updatedDefinition = event.target.textContent.trim();
          if (updatedDefinition !== entry.definition) {
              entry.definition = updatedDefinition;
              saveLexiconEntries(lexiconEntries);
          }
      });

      const additionalInfoDiv = document.createElement('div');
      additionalInfoDiv.className = 'item';
      additionalInfoDiv.textContent = entry.additionalInfo || 'Enter Additional Information';

      listItem.appendChild(deleteButton);
      listItem.appendChild(termDiv);
      listItem.appendChild(grammarDiv);
      listItem.appendChild(definitionDiv);
      listItem.appendChild(additionalInfoDiv);

      lexiconList.appendChild(listItem);
  }

  function addEntry(event) {
      event.preventDefault();
      const term = termInput.value.trim();
      const grammar = grammarInput.value.trim();
      const definition = definitionInput.value.trim();
      const additionalInfo = additionalInfoInput.value.trim();

      if (!term) {
          alert('Please enter a term.');
          return;
      }

      let lexiconEntries = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      lexiconEntries.push({ term, grammar, definition, additionalInfo });
      saveLexiconEntries(lexiconEntries);

      termInput.value = '';
      grammarInput.value = '';
      definitionInput.value = '';
      additionalInfoInput.value = '';

      lexiconList.innerHTML = '';
      loadLexiconEntries();
  }

  function deleteEntry(index) {
      let lexiconEntries = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      lexiconEntries.splice(index, 1);
      saveLexiconEntries(lexiconEntries);

      lexiconList.innerHTML = '';
      loadLexiconEntries();
  }

  entryForm.addEventListener('submit', addEntry);
  loadLexiconEntries();
});
