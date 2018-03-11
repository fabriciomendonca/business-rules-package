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
      <div class="code">
<pre>
async createPost() {
  try {
    this.post = await postExposer.createPost(this.post);
    this.error = {};
    this.errorMessages = {};
    this.success = true;
  } catch (err) {
    this.success = false;
    this.error = {
      ...this.error,
      create: true,
    };
    this.errorMessages.message = err.message;
  }
},
</pre>
      </div>
        <post-form
          id="on-submit"
          :live-validation="false"
          :use-vee-validate="false"
      ></post-form>
      <h4>Live validation</h4>
      <div class="code">
<pre>
validateTitle() {
  const additionalValidation = title => title.length > 10;

  if (!this.post.isValidTitle(additionalValidation)) {
    this.error = {
      ...this.error,
      title: true,
    };
    this.errorMessages.title = 'Title is invalid';
  } else {
    this.$delete(this.error, 'title');
    this.$delete(this.errorMessages, 'title');
  }
},
// the same applies for isValidBody validator
</pre>
      </div>
      <post-form
          id="live-validate"
          :live-validation="true"
          :use-vee-validate="false"
      ></post-form>
      <h4>Using VeeValidate</h4>
      <div class="code">
<pre>
// VeeValidate validators return promises.
// To use them as additional validation,
// it is necessary to resolve the promise before
// and return the resolved valid in a function
// that should be passed to post object validation methods
async validateBody() {
  const valid = await this.validator.validate('body', this.post.body);
  const additionalValidation = () => valid;

  if (!this.post.isValidBody(additionalValidation)) {
    this.error = {
      ...this.error,
      body: true,
    };
    this.errorMessages.body = 'Content is invalid';
  } else {
    this.$delete(this.error, 'body');
    this.$delete(this.errorMessages, 'body');
  }
},
</pre>
      </div>
      <post-form
          id="use-vee-validate"
          :live-validation="true"
          :use-vee-validate="true"
      ></post-form>
    </div>
  </section>
</template>

<script>
// eslint-disable-next-line
import { postExposer } from 'business-rules-package';
import PostForm from '../components/PostForm';

export default {
  components: {
    PostForm,
  },
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

  methods: {
    async createPostVeeValidate() {
      try {
        this.createdPostVeeValidate = await postExposer.createPost(this.postVeeValidate);
        this.postVeeValidate = postExposer.initPost();
        this.successCreateVeeValidate = true;
        this.$validator.clean();
      } catch (err) {
        this.errorCreateVeeValidate = err.message;
        this.successCreateVeeValidate = false;
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
</style>

