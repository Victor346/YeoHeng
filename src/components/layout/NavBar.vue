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
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/events' }"
      >Events</b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/trips' }"
      >Trips</b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/trip/edit' }"
      >
        Edit Trip
      </b-navbar-item>
    </template>

    <template slot="end">
      <MenuSlot v-if="isAuthenticated"/>
      <AuthSlot v-else />
    </template>
  </b-navbar>
</template>

<script>
import AuthSlot from '@/components/layout/navbar/AuthSlot.vue';
import MenuSlot from '@/components/layout/navbar/MenuSlot.vue';

export default {
  name: 'NavBar',
  components: { MenuSlot, AuthSlot },
  computed: {
    isAuthenticated() {
      return this.$store.state.login.username !== null && this.$store.state.login.token !== null;
    },
  },
};
</script>
