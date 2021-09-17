const express = require('express');

const db = require('../connect.js');
const router = express.Router();

/** Creates a new empty task. */
router.post('/new', (req, res) => {
  let con = db.make_connection()
  const query = 'INSERT INTO tasks (task_description) VALUES ("This is an empty task.");';

  con.query(query, (err, result, something) => {
    if( err ) {
      console.log(err);
      res.send(err);
      return;
    }

    console.log("Created a new empty task.");
    res.sendStatus(200);
  });

  con.end();
});

/** Gets all tasks from the database. */
router.get('/get/all', (req, res) => {

  let con = db.make_connection()
  let taskResult = null;
  con.query("SELECT * FROM tasks;", (err, result, something) => {
    if( err ) {
      console.log(err);
      res.send(err);
      return;
    }
    
    res.send(result)
  });
  
  console.log(taskResult);

  con.end();
});

router.get('/get/tags', (req, res) => {
  let con = db.make_connection();

  con.query("SELECT * FROM task_tags;", (err, result, something) => {
    if( err ) {
      console.log(err);
      res.send(err);
      return;
    }

    res.send(result);
  });

  con.end();
});

/** Gets the most recently added task from the database. */
router.get('/get/latest', (req, res) => {
  let con = db.make_connection()
  const query = 'SELECT * FROM tasks ORDER BY task_id DESC LIMIT 0, 1;';

  con.query(query, (err, result, something) => {
    if( err ) {
      console.log(err);
      res.send(err);
      return;
    }

    console.log('Fetched latest task with task_id ' + result[0].task_id);
    res.send(result);
  });

  con.end();
})

const parseDateString = (date) => {
  return date.split('T')[0]
}

router.post('/save', (req, res) => {
  let con = db.make_connection();
  
  const tasks = req.body;
  tasks.forEach((element) => {

    // Build our query
    let query = "UPDATE tasks SET ";
    if(element.task_description != null) {
      query += 'task_description="' + element.task_description + '", '

    } else {
      query += 'task_description=NULL, '
    }

    if(element.task_date != null) {
      query += 'task_date=DATE_FORMAT("' + parseDateString(element.task_date) + '", "%Y-%m-%d") ';
    } else {
      query += 'task_date=NULL '
    }

    query += 'WHERE task_id=' + element.task_id + ';';

    con.query(query, (err, result, something) =>  {
      if( err ) {
        console.log(err);
        res.send(err);
        return;
      }  

      console.log('Updated task with task_id ' + element.task_id + ' with: ' + element[0]);
    });
  });

  res.sendStatus(200);
  con.end();
});

/** Deletes tasks with the matching task_ids from the database. */
router.delete('/delete/selected', (req, res) => {

  const selected  = req.query.selected;
  let con = db.make_connection()

  selected.forEach((element) => {

    // Because we use task_tags to map tags to tasks we need to make
    // sure to remove any relationship from task_tags before removing our tag.
    const q1 = 'DELETE FROM task_tags WHERE task_id=' + element + ';';
    con.query(q1, (err, result, something) => {
      if( err ) {
        console.log(err);
        res.send(err);
        return;
      }  

      console.log("Deleted task_tags matching task_id " + element + " from task_tags.");
    });

    const q2 = 'DELETE FROM tasks WHERE task_id=' + element + ';';
    con.query(q2, (err, result, something) => {
      if( err ) {
        console.log(err);
        res.send(err);
        return;
      }  

      console.log("Deleted task with task_id " + element + " from tasks.");
    });
  })

  res.sendStatus(200)
  con.end();
});

module.exports = router;