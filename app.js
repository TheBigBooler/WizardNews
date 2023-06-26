const express = require("express");
const app = express();

// const morgan = require('morgan');
// app.use(morgan('dev'));

const volleyball = require('volleyball');
app.use(volleyball)

app.use(express.static('public'))

const postBank = require('./postBank')


app.get("/", (req, res) => {
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
  </html>`;

  res.status(200).send(html);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id
  const post = postBank.find(id);

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header> 
        <div class='news-item'>
          <p>
          
            ${post.title}
            
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>  
    </div>
  </body>
  </html>`;
  if (!post.id) {
    throw new Error('not found')
  } else {
  res.send(html) }
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Post not found!')
})

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
