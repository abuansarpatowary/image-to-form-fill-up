// Get references to the HTML elements we need to manipulate
const fileInput = document.getElementById('file-input');
const extractButton = document.getElementById('extract-button');
const resultText = document.getElementById('result-text');
const radioButtons = document.querySelectorAll('.radio-buttons input[type="radio"]');
const formData = new FormData();

radioButtons.forEach(radioButton => {
  radioButton.addEventListener('click', () => {
    const labels = document.querySelectorAll('.radio-buttons label');
    labels.forEach(label => {
      label.classList.remove('checked');
    });
    radioButton.parentElement.classList.add('checked');
    formData.set('ocrEngine', radioButton.value);
    console.log(formData.get('ocrEngine'));
  });
});

// set the initial value of the "ocrEngine" field
const initialRadioButton = document.querySelector('.radio-buttons input[type="radio"]:checked');
formData.set('ocrEngine', initialRadioButton.value);


// Function to handle the "Extract Text" button click
function handleExtractClick() {
  // Get the file object from the file input
  const file = fileInput.files[0];
  if (!file) {
    console.error('No file selected');
    return;
  }

  // Create a new form data object and add the file to it
  formData.append('image', file);
  formData.append('language', 'eng');
  formData.append('isOverlayRequired', 'true');
  formData.append('detectOrientation', 'true');
// Console all info from form data
  for (var value of formData.values()) {
    console.log(value);
  }

  // Make a POST request to the OCR.Space API with the form data
  fetch('https://api.ocr.space/parse/image', {
    method: 'POST',
    headers: {
      'apikey': 'aeea54b48988957'
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Check that the ParsedResults property exists and is an array
    if (data.ParsedResults && Array.isArray(data.ParsedResults)) {
      // Get the extracted text from the first ParsedResult object in the array
      const extractedText = data.ParsedResults[0].ParsedText;
      // Display the extracted text in the result text element
      // resultText.textContent = extractedText;
      console.log(extractedText);
      // After the text is extracted, clear the file input
      fileInput.value = '';
    } else {
      // Handle the case where the ParsedResults property is missing or not an array
      console.error('Invalid response data: missing or invalid ParsedResults property');
    }
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error(error);
  });
}

// Add a click event listener to the "Extract Text" button
extractButton.addEventListener('click', handleExtractClick);
