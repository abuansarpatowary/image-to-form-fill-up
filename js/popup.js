// Get references to the HTML elements we need to manipulate
const fileInput = document.getElementById('file-input');
const extractButton = document.getElementById('extract-button');
const resultText = document.getElementById('result-text');

// Function to handle the "Extract Text" button click
function handleExtractClick() {
  // Get the file object from the file input
  const file = fileInput.files[0];
  if (!file) {
    console.error('No file selected');
    return;
  }

  // Create a new form data object and add the file to it
  const formData = new FormData();
  formData.append('image', file);
  formData.append('language', 'eng');
  formData.append('isOverlayRequired', 'true');
  formData.append('ocrEngine', '2');
  formData.append('detectOrientation', 'true');

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
