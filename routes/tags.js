const express = require('express');

const db = require('../connect.js');
const router = express.Router();

router.get('/get/all', (req, res) => {
  let con = db.make_connection();

  con.query("SELECT * FROM tags;", (err, result, something) =>  {
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

  con.query(query, (err, result, something) =>  {
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

  const query = 'INSERT INTO tags (tag_text, tag_fg, tag_bg) VALUES ("Empty Tag", "#ffffff", "#000000");';
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

router.post('/save', (req, res) => {
  let con = db.make_connection();

  const tags = req.body;
  tags.forEach((element) => {
    
    
    let query = 'UPDATE tags SET tag_text=?, tag_fg=?, tag_bg=? WHERE tag_id=?;';

    const tag = element.tag_text
    const fg = element.tag_fg
    const bg = element.tag_bg
    const id = element.tag_id

    con.query(query, [tag, fg, bg, id], (err, result, something) => {
      if( err ) {
        res.send(err)
        throw err;
      }
  
      console.log("Updated tag with tag_id " + element.tag_id + " with: " + element);
      res.sendStatus(200);
    })  
  })
  
  con.end();
})

/** Deletes tags with the matching task_ids from the database. */
router.delete('/delete/selected', (req, res) => {

  const selected  = req.query.selected;
  let con = db.make_connection()

  selected.forEach((element) => {

    // We must delete tag relations from the task_tags table before
    // deleting any tags.
    const q1 = 'DELETE FROM task_tags WHERE tag_id=?;';
    con.query(q1, [element], (err, result, something) => {
      if( err ) {
        console.log(err);
        res.send(err);
        return;
      }  

      console.log("Deleted task_tag with tag_id " + element + " from task_tags.");
    });

    const q2 = 'DELETE FROM tags WHERE tag_id=?;';
    con.query(q2, [element], (err, result, something) => {
      if( err ) {
        console.log(err);
        res.send(err);
        return;
      }  

      console.log("Deleted tag with tag_id " + element + " from tags.");
    });
  })

  res.sendStatus(200)
  con.end();
});

module.exports = router;