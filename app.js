require('dotenv').config();

const express = require('express');

const taskRouter = require('./routes/tasks');
const tagRouter = require('./routes/tags');

// Create and configure our express application
const port = process.env.HOST_PORT || 8000
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

app.use('/api/v1/tasks/', taskRouter);
app.use('/api/v1/tags', tagRouter);

app.get('/', (req, res) => {
  res.send("Task Manager Backend V1")
});

// Start server
app.listen(port, () => {
  console.log(`Task Manager Backend is listening @ http://localhost:${port}`)
})