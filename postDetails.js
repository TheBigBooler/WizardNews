const html = require("html-template-tag");

const postDetails = (post) => {
    const doc = html`
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
    </div>`;
    if (!post.id) {
      throw new Error("not found");
    } else {
      return doc;
    }
}

module.exports = postDetails