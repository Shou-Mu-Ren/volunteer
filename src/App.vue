<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  background-color: #f7f7f7;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
html {
  scroll-behavior: smooth;
}

@media screen and (max-width: 1200px) {
  .container {
    width: 100%;
  }
}
@media screen and (max-width: 991px) {
  html {
    font-size: 85%;
  }
}
@media screen and (max-width: 500px) {
  html {
    font-size: 72.5%;
  }
}
@media screen and (max-width: 420px) {
  html {
    font-size: 62.5%;
  }
}
</style>
