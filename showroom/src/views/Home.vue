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
      <h3>postsExposer.createPost</h3>
      <p>Validates the data and creates a new post</p>
      <h4>Validate on submit</h4>
      <div class="tile bg-error fg-white" v-if="errorCreate">{{errorCreate}}</div>
      <div
        class="tile bg-success fg-white"
        v-if="successCreate"
      >
        Post "{{createdPost.title}}" was created!
      </div>
      <form @submit.prevent="createPost" class="form">
        <label for="title" class="form__label">Title</label>
        <input id="title" class="form__field" v-model="post.title">
        <label for="body" class="form__label">Content</label>
        <textarea id="body" class="form__field" v-model="post.body"></textarea>
        <button class="form__submit tile btn bg-blue fg-white" type="submit">Create post</button>
      </form>
      <h4>Live validation</h4>
      <div class="tile bg-error fg-white" v-if="errorTitleLive || errorBodyLive">
        <p v-if="errorTitleLive">{{errorTitleLive}}</p>
        <p v-if="errorBodyLive">{{errorBodyLive}}</p>
      </div>
      <div
        class="tile bg-success fg-white"
        v-if="successCreateLive"
      >
        Post "{{createdPostLive.title}}" was created!
      </div>
      <form @submit.prevent="createPostLive" class="form">
        <label for="title1" class="form__label">Title</label>
        <input
          id="title1"
          :class="['form__field', {'border-error': errorTitleLive}]"
          v-model="postLive.title"
          @input="validateTitleLive"
        >
        <label for="body1" class="form__label">Content</label>
        <textarea
          id="body1"
          :class="['form__field', {'border-error': errorBodyLive}]"
          v-model="postLive.body" @input="validateBodyLive"></textarea>
        <button
          class="form__submit tile btn bg-blue fg-white"
          type="submit"
          :disabled="!validForm">Create post</button>
      </form>
      <h4>Using vuelidate</h4>
    </div>
  </section>
</template>

<script>
// eslint-disable-next-line
import { postExposer } from 'business-rules-package';

export default {
  data() {
    return {
      errorCreate: undefined,
      successCreate: false,
      createdPost: undefined,
      errorTitleLive: undefined,
      errorBodyLive: undefined,
      successCreateLive: false,
      createdPostLive: undefined,
      posts: [],
      post: postExposer.initPost(),
      postLive: postExposer.initPost(),
      validForm: false,
    };
  },

  computed: {
    postsSliced() {
      return this.posts.length > 6 ? this.posts.slice(-6) : this.posts.slice(0).reverse();
    },
  },

  methods: {
    validateTitleLive() {
      if (!this.postLive.isValidTitle(title => title.length > 10)) {
        this.errorTitleLive = 'Title is invalid';
      } else {
        this.errorTitleLive = undefined;
      }

      this.validForm = this.postLive.isValid();
    },

    validateBodyLive() {
      if (!this.postLive.isValidBody()) {
        this.errorBodyLive = 'Content is invalid';
      } else {
        this.errorBodyLive = undefined;
      }

      this.validForm = this.postLive.isValid();
    },

    async createPost() {
      try {
        this.createdPost = await postExposer.createPost(this.post);
        this.errorCreate = undefined;
        this.successCreate = true;
        this.post = postExposer.initPost();
      } catch (err) {
        this.errorCreate = err.message;
        this.successCreate = false;
      }
    },

    async createPostLive() {
      try {
        this.createdPostLive = await postExposer.createPost(this.postLive);
        this.errorCreateLive = undefined;
        this.successCreateLive = true;
        this.postLive = postExposer.initPost();
      } catch (err) {
        this.errorCreateLive = err.message;
        this.successCreateLive = false;
      }
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

.form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
}

.form__label {
  margin: 10px 0;
}

.form__field {
  margin-bottom: 20px;
  padding: 5px;
}

.form__submit {
  align-self: flex-end;
  flex-grow: 0;
}
</style>

