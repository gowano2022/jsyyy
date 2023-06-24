// Function to generate a random number
function generateRandomNumber() {
  return Math.floor(Math.random() * 100);
}

// Get the random number element
const randomNumberElement = document.getElementById('randomNumber');

// Generate a random number and update the element
randomNumberElement.textContent = generateRandomNumber();

// Send the random number to Gmail
fetch('/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ number: randomNumberElement.textContent })
})
  .then(response => {
    if (response.ok) {
      console.log('Email sent successfully');
    } else {
      throw new Error('Failed to send email');
    }
  })
  .catch(error => {
    console.error('Error sending email:', error.message);
  });
