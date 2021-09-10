require('dotenv').config();

const express = require('express');
const db = require('./connect.js');
const bodyParser = require('body-parser');

// Create and configure our express application
const port = process.env.HOST_PORT
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Start server
app.listen(port, () => {
  console.log(`Task Manager Backend is listening @ http://localhost:${port}`)
})

/** Gets all tasks from the database. */
app.get('/tasks/get/all', (req, res) => {
  let con = db.make_connection()
  con.query("SELECT * FROM tasks;", function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    res.send(result);
  });
  
  con.end();
});

/** Gets the task with matching id from the database. */
app.get('/tasks/get/id/:id', (req, res) => {
  let con = db.make_connection()
  const query = 'SELECT * FROM tasks WHERE task_id=' + req.params.id + ';';

  con.query(query, function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    console.log('Fetched all tasks.');
    res.send(result);
  });

  con.end();
});

/** Gets the most recently added task from the database. */
app.get('/tasks/get/latest', (req, res) => {
  let con = db.make_connection()
  const query = 'SELECT * FROM tasks ORDER BY task_id DESC LIMIT 0, 1;';

  con.query(query, function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    console.log('Fetched latest task with task_id ' + result[0].task_id);
    res.send(result);
  });

  con.end();
})

/** Creates a new empty task. */
app.post('/tasks/new/empty', (req, res) => {
  let con = db.make_connection()
  const query = 'INSERT INTO tasks (task_description) VALUES ("This is an empty task.");';

  con.query(query, function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    console.log("Created a new empty task.");
    res.sendStatus(200);
  });

  con.end();
});

app.post('/tasks/save', (req, res) => {
  let con = db.make_connection();
  
  const tasks = req.body;
  tasks.forEach((element) => {
    const query = 'UPDATE tasks SET task_description="' + element.task_description + '" WHERE task_id=' + element.task_id + ';';
    con.query(query, function(err, result, something) {
      if( err ) {
        res.send(err)
        throw err;
      }  

      console.log('Updated task with task_id ' + element.task_id + ' with: ' + element[0]);
    });
  });

  res.sendStatus(200);
  con.end();
});

/** Deletes tasks with the matching task_ids from the database. */
app.delete('/tasks/delete/:selected', (req, res) => {

  const selected  = req.query.selected;
  let con = db.make_connection()

  selected.forEach((element) => {
    const query = 'DELETE FROM tasks WHERE task_id=' + element + ';';
    con.query(query, function(err, result, something) {
      if( err ) {
        res.send(err)
        throw err;
      }  

      console.log("Deleted task with task_id " + element + " from tasks.");
    });
  })

  res.sendStatus(200)
  con.end();
});

