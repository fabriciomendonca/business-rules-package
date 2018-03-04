<template>
  <div class="home">
    <section>
      <h2>Posts exposer</h2>
    </section>
  </div>
</template>

<script>
import { postExposer } from 'business-rules-package';

export default {
  data() {
    return {
      posts: [],
    };
  },

  async created() {
    this.posts = await postExposer.posts;
  },
};
</script>

<style lang="css" scoped>
</style>

