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

    console.log('Retrieved all tags');
    res.send(result);
  });

  con.end();
});

router.get('/get/latest', (req, res) => {
  let con = db.make_connection()
  const query = 'SELECT * FROM tags ORDER BY tag_id DESC LIMIT 0, 1;';

  con.query(query, function(err, result, something) {
    if( err ) {
      res.send(err)
      throw err;
    }

    console.log('Fetched latest tag with tag_id ' + result[0].tag_id);
    res.send(result);
  });

  con.end();
})

router.post('/new', (req, res) => {

  let con = db.make_connection();

  const query = 'INSERT INTO tags (tag_text, tag_fg, tag_bg) VALUES ("New Tag", "#ffffff", "#000000");';
  con.query(query, (err, result, something) => {
    if( err ) {
      res.send(err)
      throw err;
    }

    console.log("Created a new empty tag.");
    res.sendStatus(200);
  })

  con.end();

})

/** Deletes tags with the matching task_ids from the database. */
router.delete('/delete/selected', (req, res) => {

  const selected  = req.query.selected;
  let con = db.make_connection()

  selected.forEach((element) => {
    const query = 'DELETE FROM tags WHERE tag_id=' + element + ';';
    con.query(query, function(err, result, something) {
      if( err ) {
        res.send(err)
        throw err;
      }  

      console.log("Deleted tag with tag_id " + element + " from tags.");
    });
  })

  res.sendStatus(200)
  con.end();
});

module.exports = router;