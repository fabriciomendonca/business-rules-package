<template>
  <div class="home">
    <section>
      <h2>Posts exposer</h2>
      <h3>postExposer.posts</h3>
      <p>Get all posts from jsonplaceholder.</p>
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
      <small>Just the last 6 posts are shown bellow.</small>
      <ul v-if="postsSliced.length">
        <li v-for="post in postsSliced" :key="`post-${post.id}`">
          <router-link :to="`/posts/${post.id}`">{{post.title}}</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
// eslint-disable-next-line
import { postExposer } from 'business-rules-package';

export default {
  data() {
    return {
      posts: [],
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
  list-style: none;
}
pre {
  background: #ebebeb;
  margin: 0 auto;
  max-width: 600px;
  padding: 10px;
  text-align: left;
}
</style>

