<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css"
    >
    <NavBar />
    <router-view id="router-view"/>
    <Footer class="is-hidden-mobile" />
  </div>
</template>

<script>
import NavBar from '@/components/layout/NavBar.vue';
import Footer from '@/components/layout/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#router-view {
  padding-top: 5%;
  padding-bottom: 5%;
}

@media screen and (max-width: 1024px) {
  #router-view {
    padding-top: 16%;
    padding-bottom: 8%;
  }
}

</style>
