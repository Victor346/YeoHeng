<template>
  <b-navbar-item tag="div">
    <div class="buttons">
      <b-field class="mx-4">
        <h1 class="subtitle">
          Hello {{getUsername}}!
        </h1>
      </b-field>
      <b-button
        @click="clickMe"
        type="is-danger"
      >
        <strong>Log Out</strong>
      </b-button>
    </div>
  </b-navbar-item>
</template>

<script>
import { LOGOUT } from '@/store/mutations/types';
import router from '@/router';

export default {
  name: 'MenuSlot',
  computed: {
    getUsername() {
      return this.$store.state.login.username;
    },
  },
  methods: {
    clickMe() {
      this.$store.commit(LOGOUT);
      router.push('/');
    },
  },
};
</script>
