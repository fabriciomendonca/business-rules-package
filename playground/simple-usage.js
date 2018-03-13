const postExposer = require('business-rules-package').postExposer;

let posts;
let post;
(async () => {
  try {
    posts = await postExposer.posts;
    console.log(`${posts.length} posts where loaded`);
  } catch (err) {
    console.log(err.message);
  }

  post = postExposer.initPost();

  post.title = 'Title example';
  post.body = 'Should have more than 10 characters';

  try {
    post = await postExposer.createPost(post);
    console.log(`Created post with id ${post.id}`);
  } catch (err) {
    console.log(err.message);
  }

  // set a random post to edit
  post = postExposer.initPost();
  post.copyData(posts[47]);
  post.title += ' edited';
  try {
    post = await postExposer.savePost(post);
    console.log(`New title is '${post.title}'`);
  } catch (err) {
    console.log(err.message);
  }
})();