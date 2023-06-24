const express = require('express');
const app = express();
const emailRoute = require('./email');

app.use(express.static('public'));
app.use(express.json());
app.use('/send-email', emailRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
