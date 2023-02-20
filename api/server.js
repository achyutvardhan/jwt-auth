const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('hello ');
});
app.get('*', (req, res) => {
  res.send('page does not exist ');
});
app.listen(8080, () => {
  console.log('welcome to port 8080');
});
