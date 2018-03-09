<template>
  <section class="home">
    <div>
      <h2>Posts exposer</h2>
      <div class="code">
<pre>
import { postExposer } from 'business-rules-package';
</pre>
      </div>
      <h3>postExposer.posts</h3>
      <p>Get all posts from jsonplaceholder.</p>
      <div class="code">
<pre>
data() {
  return {
    posts: [],
  },
},

async created() {
  this.posts = await postExposer.posts;
},
</pre>
      </div>
      <small>Just the last 6 posts are shown bellow.</small>
      <ul v-if="postsSliced.length">
        <li v-for="post in postsSliced" :key="`post-${post.id}`">{{post.title}}</li>
      </ul>
      <h3>postsExposer.initPost</h3>
      <p>Returns a new Post object</p>
      <div class="code">
<pre>
data() {
  return {
    post: postsExposer.initPost(),
  },
},
</pre>
      </div>
    </div>
  </section>
</template>

<script>
// eslint-disable-next-line
import { postExposer } from 'business-rules-package';

export default {
  data() {
    return {
      posts: [],
      post: postExposer.initPost(),
    };
  },

  computed: {
    postsSliced() {
      return this.posts.length > 6 ? this.posts.slice(-6) : this.posts.slice(0).reverse();
    },
  },

  async created() {
    this.posts = await postExposer.posts;
  },
};
</script>

<style lang="css" scoped>
ul {
  margin: 20px 0;
  padding: 0 40px;
}
.code {
  background: #ebebeb;
  margin: 20px 0;
  overflow: auto;
  padding: 10px;
  text-align: left;
}
</style>

