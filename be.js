document.addEventListener('DOMContentLoaded', () => {
  // Define Greek map for transcription
  const greekMap = {
      // Diphthongs
      'πh': 'φ', 'ph': 'φ', 'κh': 'χ', 'kh': 'χ', 'τh': 'θ', 'th': 'θ',
      'πs': 'ψ', 'ps': 'ψ', 'ks': 'ξ', 'κs': 'ξ', 'rh': 'ῥ', 'ρh': 'ῥ',
      'PH': 'Φ', 'ΠH': 'Φ', 'Ph': 'Φ', 'Πh': 'Φ', 'KH': 'Χ', 'ΚH': 'Χ',
      'Kh': 'Χ', 'Κh': 'Χ', 'TH': 'Θ', 'ΤH': 'Θ', 'Th': 'Θ', 'Τh': 'Θ',
      'PS': 'Ψ', 'ΠS': 'Ψ', 'Ps': 'Ψ', 'Πs': 'Ψ', 'Ps': 'Ξ', 'Κs': 'Ξ',
      'Rh': 'Ῥ', 'Ρh': 'Ῥ',
      // Complex
      'ἀ\'': 'ἄ', 'ἐ\'': 'ἔ', 'ἰ\'': 'ἴ', 'ὀ\'': 'ὄ', 'ὐ\'': 'ὔ',
      'ἠ\'': 'ἤ', 'ὠ\'': 'ὤ', 'ἁ\'': 'ἅ', 'ἑ\'': 'ἕ', 'ἱ\'': 'ἵ',
      'ὁ\'': 'ὅ', 'ὑ\'': 'ὕ', 'ἡ\'': 'ἥ', 'ὡ\'': 'ὥ',
      'ἄ\'': 'ἂ', 'ἔ\'': 'ἒ', 'ἴ\'': 'ἲ', 'ὄ\'': 'ὂ', 'ὔ\'': 'ὒ',
      'ἤ\'': 'ἢ', 'ὤ\'': 'ὢ', 'ἅ\'': 'ἃ', 'ἕ\'': 'ἓ', 'ἵ\'': 'ἳ',
      'ὅ\'': 'ὃ', 'ὕ\'': 'ὓ', 'ἥ\'': 'ἣ', 'ὥ\'': 'ὣ',
      'ἀ~': 'ἆ', 'ἰ~': 'ἶ', 'ὐ~': 'ὖ', 'ἠ~': 'ἦ', 'ὠ~': 'ὦ',
      'ἁ~': 'ἇ', 'ἱ~': 'ἷ', 'ὑ~': 'ὗ', 'ἡ~': 'ἧ', 'ὡ~': 'ὧ',
      // Iota subscript-adscript
      'α=': 'ᾳ', 'η=': 'ῃ', 'ω=': 'ῳ',
      'ᾴ\'': 'ᾲ', 'ῄ\'': 'ῂ', 'ῴ\'': 'ῲ',
      'ᾳ\'': 'ᾴ', 'ῃ\'': 'ῄ', 'ῳ\'': 'ῴ',
      'ᾳ~': 'ᾷ', 'ῃ~': 'ῇ', 'ῳ~': 'ῷ',
      'ἀ=': 'ᾀ', 'ἠ=': 'ᾐ', 'ὠ=': 'ᾠ', 'ἁ=': 'ᾁ', 'ἡ=': 'ᾑ', 'ὡ=': 'ᾡ',
      "ᾀ\'": 'ᾄ', "ᾐ\'": 'ᾔ', "ᾠ\'": 'ᾤ', "ᾁ\'": 'ᾅ', "ᾑ\'": 'ᾕ', "ᾡ\'": 'ᾥ',
      "ᾄ\'": 'ᾂ', "ᾔ\'": 'ᾒ', "ᾤ\'": 'ᾢ', "ᾅ\'": 'ᾃ', "ᾕ\'": 'ᾓ', "ᾥ\'": 'ᾣ',
      'ᾀ~': 'ᾆ', 'ᾐ~': 'ᾖ', 'ᾠ~': 'ᾦ', 'ᾁ~': 'ᾇ', 'ᾑ~': 'ᾗ', 'ᾡ~': 'ᾧ',
      // Rough breathing
      'ha': 'ἁ', 'he': 'ἑ', 'hi': 'ἱ', 'ho': 'ὁ', 'hu': 'ὑ', 'hv': 'ὑ',
      'hy': 'ὑ', 'hj': 'ἡ', 'hw': 'ὡ', '-a': 'ἁ', '-e': 'ἑ', '-i': 'ἱ',
      '-o': 'ὁ', '-u': 'ὑ', '-v': 'ὑ', '-y': 'ὑ', '-j': 'ἡ', '-w': 'ὡ',
      'Ha': 'Ἁ', 'He': 'Ἑ', 'Hi': 'Ἱ', 'Ho': 'Ὁ', 'Hu': 'Ὑ', 'Hv': 'Ὑ',
      'Hy': 'Ὑ', 'Hj': 'Ἡ', 'Hw': 'Ὡ', 'HA': 'Ἁ', 'HE': 'Ἑ', 'HI': 'Ἱ',
      'HO': 'Ὁ', 'HU': 'Ὑ', 'HV': 'Ὑ', 'HY': 'Ὑ', 'HJ': 'Ἡ', 'HW': 'Ὡ',
      // Smooth breathing
      '#a': 'ἀ', '#e': 'ἐ', '#i': 'ἰ', '#o': 'ὀ', '#u': 'ὐ', '#v': 'ὐ',
      '#y': 'ὐ', '#j': 'ἠ', '#w': 'ὠ',
      '#A': 'Ἀ', '#E': 'Ἐ', '#I': 'Ἰ', '#O': 'Ὀ', '#J': 'Ἠ', '#W': 'Ὠ',
      // Accented
      "ά\'": "ὰ", "έ\'": "ὲ", "ί\'": "ὶ", "ό\'": "ὸ", "ύ\'": "ὺ",
      "ή\'": "ὴ", "ώ\'": "ὼ", "α\'": "ά", "ε\'": "έ", "ι\'": "ί",
      "ο\'": "ό", "υ\'": "ύ", "η\'": "ή", "ω\'": "ώ", "α~": "ᾶ",
      "η~": "ῆ", "ι~": "ῖ", "ω~": "ῶ", "υ~": "ῦ", "α-": "ᾱ",
      "ι-": "ῑ", "υ-": "ῡ", "Ά\'": "Ὰ", "Έ\'": "Ὲ", "Ί\'": "Ὶ",
      "Ό\'": "Ὸ", "ϓ\'": "Ὺ", 'Ή\'': 'Ὴ', 'Ώ\'': 'Ὼ', "Α\'": "Ά",
      "Ε\'": "Έ", "Ι\'": "Ί", "Ο\'": "Ό", "Υ\'": "ϓ", 'Η\'': 'Ή',
      'Ω\'': 'Ώ',
      // Monophthongs
      'a': 'α', 'b': 'β', 'd': 'δ', 'e': 'ε', 'g': 'γ', 'h': '-', 'j': 'η',
      'i': 'ι', 'k': 'κ', 'l': 'λ', 'm': 'μ', 'n': 'ν', 'o': 'ο', 'p': 'π',
      'r': 'ρ', 's': 'σ', 't': 'τ', 'u': 'υ', 'v': 'υ', 'y': 'υ', 'w': 'ω',
      'x': 'ξ', 'z': 'ζ',
      'A': 'Α', 'B': 'Β', 'D': 'Δ', 'E': 'Ε', 'G': 'Γ', 'H': '-', 'J': 'Η',
      'I': 'Ι', 'K': 'Κ', 'L': 'Λ', 'M': 'Μ', 'N': 'Ν', 'O': 'Ο', 'P': 'Π',
      'R': 'Ρ', 'S': 'Σ', 'T': 'Τ', 'U': 'Υ', 'V': 'Υ', 'Y': 'Υ', 'W': 'Ω',
      'X': 'Ξ', 'Z': 'Ζ',
      // Archaic
      'F=': 'Ϝ', 'Q=': 'Ϙ', 'Ss=': 'Ͳ', 'Σσ=': 'Ͳ', 'Sz=': 'Ϻ', 'Σζ=': 'Ϻ',
      'S-=': 'Ϸ', 'Σ-=': 'Ϸ', 'f=': 'ϝ', 'q=': 'ϙ', 'ss=': 'ͳ', 'σσ=': 'ͳ',
      'sz=': 'ϻ', 'σζ=': 'ϻ', 's-=': 'ϸ', 'σ-=': 'ϸ'
  };

  // Function to transcribe Greek text
  function transcribe(event) {
      const currentText = event.target.value;
      let processedText = currentText;
      for (const [key, value] of Object.entries(greekMap)) {
          const regex = new RegExp(key, 'g');
          processedText = processedText.replace(regex, value);
      }
      processedText = processedText.replace(/σ\s/g, 'ς ');
      event.target.value = processedText;
  }

  // Add 'input' event listener to each text area
  document.querySelectorAll('.textArea').forEach(textarea => {
      textarea.addEventListener('input', transcribe);
  });

  function transcribe(event) {
    const currentText = event.target.value;
    let processedText = currentText;
    for (const [key, value] of Object.entries(greekMap)) {
        const regex = new RegExp(key, 'g');
        processedText = processedText.replace(regex, value);
    }
    processedText = processedText.replace(/σ\s/g, 'ς ');
    event.target.value = processedText;
}

// Add 'input' event listener to each text area
document.querySelectorAll('.textArea').forEach(textarea => {
    textarea.addEventListener('input', transcribe);
});

// Function to check answers
function checkAnswers() {
    console.log('Checking answers...');
    const textareas = document.querySelectorAll('table .textArea');
    let allCorrect = true;

    textareas.forEach(textarea => {
        const correctAnswers = textarea.getAttribute('data-correct-answer').split(',').map(answer => answer.trim());
        const userAnswer = textarea.value.trim();
        
        console.log(`User Answer: ${userAnswer}`);
        console.log(`Correct Answers: ${correctAnswers}`);
        
        if (correctAnswers.some(answer => answer === userAnswer)) {
            textarea.style.borderColor = 'green'; // Correct answer styling
        } else {
            textarea.style.borderColor = 'red'; // Incorrect answer styling
            allCorrect = false;
        }
    });

    // Display feedback based on correctness of all answers
    if (allCorrect) {
        document.getElementById('feedback').style.display = 'block';
        document.getElementById('errorFeedback').style.display = 'none';
    } else {
        document.getElementById('feedback').style.display = 'none';
        document.getElementById('errorFeedback').style.display = 'block';
    }
}

// Function to clear/reset textareas
function clearFn() {
    console.log('Clearing textareas...');
    document.querySelectorAll('table .textArea').forEach(textarea => {
        textarea.value = '';
        textarea.style.borderColor = ''; // Reset border color
    });
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('errorFeedback').style.display = 'none';
}

// Add event listener for Check Answers button
const checkButton = document.querySelector('button[onclick="checkAnswers()"]');
if (checkButton) {
    checkButton.addEventListener('click', checkAnswers);
} else {
    console.error('Check Answers button not found');
}

// Add event listener for Reset button
const resetButton = document.querySelector('button[onclick="clearFn()"]');
if (resetButton) {
    resetButton.addEventListener('click', clearFn);
} else {
    console.error('Reset button not found');
}

// Add 'keydown' event listener to each textarea within a table
document.querySelectorAll('table .textArea').forEach(textarea => {
    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default Enter key behavior
            checkAnswers(); // Call the checkAnswers function
        }
    });
});
});
