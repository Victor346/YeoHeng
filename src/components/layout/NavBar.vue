<template>

  <b-navbar
    :fixed-top="true"
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
      <b-navbar-dropdown label="Info">
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/about' }"
        >
          About Us
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/contact' }"
        >
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            tag="router-link"
            :to="{ path: '/signup' }"
            type="is-primary"
          >
            <strong>Sign up</strong>
          </b-button>
          <b-button
            tag="router-link"
            :to="{ path: '/login' }"
            type="is-light"
          >
            Log in
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
