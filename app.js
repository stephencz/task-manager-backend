require('dotenv').config();
const express = require('express')


const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getTasks', (req, res) => {
  res.send("Poopy");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
