const express = require('express');

const db = require('../connect.js');
const router = express.Router();

router.get('/get/all', (req, res) => {
  let con = db.make_connection();

  con.query("SELECT * FROM tags;", function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    res.send(result);
  });

  con.end();
});

module.exports = router;