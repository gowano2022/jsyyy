const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const { number } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '01028838444a@gmail.com', // Replace with your Gmail address
      pass: 'Gomaa@123' // Replace with your Gmail password
    }
  });

  const mailOptions = {
    from: '01028838444a@gmail.com', // Replace with your Gmail address
    to: 'titolion980@gmail.com', // Replace with the recipient's email address
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

module.exports = router;
