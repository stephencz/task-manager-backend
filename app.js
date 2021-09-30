require('dotenv').config();

const express = require('express');
const cors = require('cors');

const taskRouter = require('./routes/tasks');
const tagRouter = require('./routes/tags');
const taskTagsRouter = require('./routes/task_tags');

// Create and configure our express application
const port = process.env.HOST_PORT || 8000
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

app.use('/api/v1/tasks/', taskRouter);
app.use('/api/v1/tags/', tagRouter);
app.use('/api/v1/task_tags/', taskTagsRouter);

app.get('/', (req, res) => {
  res.send("Task Manager Backend v1")
});

// Start server
app.listen(port, () => {
  console.log(`Task Manager Backend v1 is listening @ http://localhost:${port}`)
})