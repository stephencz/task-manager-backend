require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./connect.js');

const app = express();

const port = process.env.HOST_PORT

app.use(cors())
app.options('*', cors())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/**
 * Gets all the tasks in the database.
 */
app.get('/tasks/get/all', (req, res) => {
  let con = db.make_connection()
  results = con.query("SELECT * FROM tasks;", function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    res.send(result);
  });
});

/**
 * Gets the task with the matching id.
 */
app.get('/tasks/get/id/:id', (req, res) => {
  let con = db.make_connection()
  const query = 'SELECT * FROM tasks WHERE task_id=' + req.params.id + ';';

  results = con.query(query, function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    res.send(result);
  });
});

/**
 * Gets the Task with the highest primary key i.e. the latest task added to the
 * database.
 */
app.get('/tasks/get/latest', (req, res) => {
  let con = db.make_connection()
  const query = 'SELECT * FROM tasks ORDER BY task_id DESC LIMIT 0, 1;';

  results = con.query(query, function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    res.send(result);
  });
})

/**
 * Creates a new empty task.
 */
app.post('/tasks/new/empty', (req, res) => {
  let con = db.make_connection()
  const query = 'INSERT INTO tasks (task_description) VALUES ("This is an empty task.");';

  results = con.query(query, function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    res.send(result);
  });
});

app.delete('/tasks/delete/:selected', (req, res) => {

  const selected  = req.query.selected;
  const removed = []

  let con = db.make_connection()

  selected.forEach((elem) => {
    const query = 'DELETE FROM tasks WHERE task_id=' + elem + ';';
    results = con.query(query, function(err, result, something) {
      if( err ) {
        res.send(err)
        throw err;
      }  

      removed.push(elem)
    });
  })

  console.log(removed);

  res.json(removed);
});
