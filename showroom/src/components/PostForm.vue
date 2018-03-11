<template>
  <div class="post-form">
    <div class="tile bg-error fg-white" v-if="showError">
      <ul>
        <li v-for="(message, index) in errorMessages" :key="index">{{message}}</li>
      </ul>
    </div>
    <div
      class="tile bg-success fg-white"
      v-if="success"
    >
      Post "{{post.title}}" was created!
    </div>
    <form @submit.prevent="submit" class="form" :data-vv-scope="id">
      <label :for="`${id}-title`" class="form__label">Title</label>
      <input
        :id="`${id}-title`"
        :class="['form__field', {'border-error': borderError && error.title}]"
        @input="validateTitle"
        v-model="post.title"
      >
      <label :for="`${id}-body`" class="form__label">Content</label>
      <textarea
        :id="`${id}-body`"
        :class="['form__field', {'border-error': borderError && error.body}]"
        @input="validateBody"
        v-model="post.body"
      ></textarea>
      <button class="form__submit tile btn bg-blue fg-white" type="submit">{{action}} post</button>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line
import { postExposer } from 'business-rules-package';
import { Validator } from 'vee-validate';

export default {
  name: 'post-form',
  props: ['id', 'liveValidation', 'useVeeValidate'],
  data() {
    return {
      post: postExposer.initPost(),
      error: {},
      errorMessages: {},
      success: false,
      valid: false,
      validator: undefined,
    };
  },

  computed: {
    action() {
      return this.post.id ? 'Save' : 'Create';
    },

    borderError() {
      return this.error && (this.liveValidation || this.useVeeValidate);
    },

    showError() {
      return this.error && Object.keys(this.error).length > 0;
    },
  },

  methods: {
    async validateTitle() {
      if (!this.liveValidation) {
        return;
      }

      let additionalValidation = title => title.length > 10;

      if (this.useVeeValidate) {
        const valid = await this.validator.validate('title', this.post.title);
        additionalValidation = () => valid;
      }

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

    async validateBody() {
      if (!this.liveValidation) {
        return;
      }

      let additionalValidation = () => true;
      if (this.useVeeValidate) {
        const valid = await this.validator.validate('body', this.post.body);
        additionalValidation = () => valid;
      }

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

    submit() {
      if (this.post.id) {
        return this.savePost();
      }

      return this.createPost();
    },

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

    async savePost() {
      return false;
    },
  },

  created() {
    if (this.useVeeValidate) {
      this.validator = Validator.create({
        title: 'required|min:10',
        body: 'required|min:20',
      });
    }
  },
};
</script>

<style scoped>
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
