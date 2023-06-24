const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Render GET request handler
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/index.tjs'));
});

// Generate number POST request handler
app.post('/generate-number', (req, res) => {
	// Generate a random number between 1 and 100
	const randomNumber = Math.floor(Math.random() * 100) + 1;

	// Send the number to the email address using Nodemailer
	sendEmail(randomNumber, req.body.email).then(() => {
		res.status(200).send('The number ' + randomNumber + ' has been sent to your email address.');
	}).catch((err) => {
		console.error(err);
		res.status(500).send('An error occurred while sending the email.');
	});
});

// Start the server
app.listen(port, () => {
	console.log('Server started on port ' + port);
});

// Send email function using Nodemailer
function sendEmail(number, email) {
	return new Promise((resolve, reject) => {
		// Create a transporter object using SMTP
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: '01028838444a@gmail.com',
				pass: 'Gomaa@123'
			}
		});

		// Create an email message
		const message = {
			from: '01028838444a@gmail.com',
			to: 'titolion980@gmail.com',
			subject: 'Random Number Generated',
			text: 'The random number generated is: ' + number
		};

		// Send the email
		transporter.sendMail(message, (err, info) => {
			if (err) {
				reject(err);
			} else {
				resolve(info);
			}
		});
	});
}
