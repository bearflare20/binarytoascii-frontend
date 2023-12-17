let isBinaryMode = false;

function convert() {
    const inputData = document.getElementById('inputData').value;
    let endpoint = 'https://binary-ascii-converter.glitch.me/text-to-binary'; // Default endpoint for text-to-binary conversion

    if (isBinaryMode) {
        endpoint = 'https://binary-ascii-converter.glitch.me/binary-to-text'; // Endpoint for binary-to-text conversion
    }

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: inputData })
    })
    .then(response => response.json())
    .then(data => {
        const result = isBinaryMode ? data.ascii_text : data.binary_text;
        document.getElementById('output').innerText = result || data.error || 'Conversion failed';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'Error occurred';
    });
}

function swapConversion() {
    isBinaryMode = !isBinaryMode;

    const inputPlaceholder = isBinaryMode ? 'Enter binary...' : 'Enter text...';
    document.getElementById('inputData').placeholder = inputPlaceholder;

    const convertButton = document.getElementById('convertButton');

    convertButton.innerText = isBinaryMode ? 'Convert to Text' : 'Convert to Binary'; // Change the main conversion button text

    document.getElementById('output').innerText = ''; // Clear output when swapping
}
