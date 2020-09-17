<template>
  <form @submit="handleSubmit">
    <b-field
      class="has-text-left"
      label="Username"
    >
      <b-input
        v-model="username"
        placeholder="Insert your username or email"
        icon="account"
        required
      >
      </b-input>
    </b-field>

    <b-field
      class="has-text-left"
      label="Password"
    >
      <b-input
        v-model="password"
        type="password"
        placeholder="Insert your password"
        required
      >
      </b-input>
    </b-field>

    <b-field
      position="is-centered"
    >
      <button
        class="button is-info is-rounded my-4"
        type="submit"
      >
        Log In
      </button>
    </b-field>
  </form>
</template>

<script>
import { AUTHENTICATE_USER } from '@/store/actions/types';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.$store.dispatch(AUTHENTICATE_USER, {
        email: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>

</style>
