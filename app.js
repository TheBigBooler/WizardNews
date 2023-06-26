const express = require("express");
const app = express();

// const morgan = require('morgan');
// app.use(morgan('dev'));

const volleyball = require('volleyball');
app.use(volleyball)

app.use(express.static('public'))

const postBank = require('./postBank')
const postList = require('./postList')
const postDetails = require('./postDetails')


app.get("/", (req, res) => {
  const posts = postBank.list();

 res.send(postList(posts));
});

app.get('/posts/:id', (req, res) => {
  
  const post = postBank.find(req.params.id);

  res.send(postDetails(post));
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Post not found! Click <a href="/">HERE</a> to return to the homepage')
})

const  { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
