<template>
  <b-navbar
    :fixed-bottom="true"
    type="is-light"
  >
    <template slot="brand">
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/' }">
        <img
          src="../../assets/yeoheng_logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        >
      </b-navbar-item>
    </template>

    <template slot="start">
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/about' }"
      >
        About Us
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <strong>Copyright YeoHeng, 2020</strong>
      </b-navbar-item>
    </template>

  </b-navbar>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>

</style>
