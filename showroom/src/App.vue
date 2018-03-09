<template>
  <main id="app" class="app">
    <section class="header bg-blue fg-white">
      <header>
        <h1>Business rules package</h1>
      </header>
    </section>
    <router-view/>
  </main>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 20px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.app {
  color: #2c3e50;
}

.app > section {
  padding: 40px;
}

.bg-blue {
  background: #00a0e1;
  color: white
}

.fg-white {
  color: white;
}
</style>
