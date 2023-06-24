const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/send-email', (req, res) => {
  const { number } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your Gmail address
      pass: 'your-password' // Replace with your Gmail password
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your Gmail address
    to: '01028838444a@gmail.com', // Replace with the recipient's email address
    subject: 'Random Number',
    text: `The random number is: ${number}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      console.log('Email sent: ' + info.response);
      res.sendStatus(200);
    }
  });
});

module.exports = app;
