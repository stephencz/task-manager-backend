const express = require('express');

const db = require('../connect.js');
const router = express.Router();

router.get('/get/all', (req, res) => {
  let con = db.make_connection();

  con.query('SELECT * FROM task_tags;', (err, result, something) => {
    if( err ) {
      console.log(err);
      res.send(err);
      return;
    }

    console.log('Retrieved all task_tags.');
    res.send(result);
  });

  con.end();
});

router.post('/save', (req, res) => {
  let con = db.make_connection();
  
  const body = req.body[0];

  const task_id = body.task_id
  const tag_id = body.tag_id

  const query = "INSERT INTO task_tags (task_id, tag_id) VALUES (?, ?);" 
  con.query(query, [task_id, tag_id], (err, result, something) => {
    if(err) {
      console.log(err);
      res.send(err);
      return;
    }

    console.log("Added task tag with relationship " + task_id + ":" + tag_id + ".");
    res.sendStatus(200);
  })


  con.end();
})

router.delete('/delete', (req, res) => {
  let con = db.make_connection();

  const remove  = req.query.remove;
  const query = "DELETE FROM task_tags WHERE task_tag_id=?;"
  con.query(query, [remove[0]], (err, result, something) => {
    if(err) {
      console.log(err);
      res.send(err);
      return;
    }

    console.log("Removed task_tag with id " + remove[0] + ".");
    res.sendStatus(200);
  });

  con.end();
});

module.exports = router;