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
html {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 20px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
input, textarea {
  font-size: 1rem;
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

.bg-error {
  background: #e14100;
}

.bg-success {
  background: #00b434;
}

.border-error {
  border: 2px solid #e14100;
}

.fg-white {
  color: white;
}

.tile {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  font-size: 1rem;
  margin: 10px 0;
  padding: 10px;
}

.btn {
  border: 0;
  cursor: pointer;
  opacity: 1;
}
.btn[disabled] {
  cursor: initial;
  opacity: 0.3;
}
</style>
