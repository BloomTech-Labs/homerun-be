const express = require('express');
const app = express();

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/express', (req, res) => {
  res.send('Express Routes Are Working!!!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))