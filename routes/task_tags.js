const express = require('express');

const db = require('../connect.js');
const router = express.Router();

router.get('/get/all', (req, res) => {
  let con = db.make_connection();

  con.query('SELECT * FROM task_tags;', (err, result, something) => {
    if( err ) {
      res.send(err)
      throw err;
    }

    console.log('Retrieved all task_tags.');
    res.send(result);
  });

  con.end();
});

module.exports = router;