require('dotenv').config();

const db = require('./connect.js');
const express = require('express');

const app = express();
const port = process.env.HOST_PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tasks', (req, res) => {
  let con = db.make_connection()
  results = con.query("SELECT * FROM tasks;", function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    res.send(result);
  });

});


app.get('/createEmptyTask', (req, res) => {
  res.send("Poopy");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
