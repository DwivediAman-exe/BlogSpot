const express = require('express');
require('dotenv').config();

const app = express();

app.get('/rest', (req, res) => {
  res.json({
    data: 'you hit the endpoint',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
