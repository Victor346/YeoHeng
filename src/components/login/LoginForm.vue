<template>
  <form @submit="handleSubmit">
    <b-field
      class="has-text-left"
      label="Email"
    >
      <b-input
        v-model="email"
        type="email"
        placeholder="Insert your email"
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
      email: '',
      password: '',
    };
  },
  methods: {
    handleSubmit(e) {
      const loadingComponent = this.$buefy.loading.open({
        container: null,
      });
      e.preventDefault();
      this.$store.dispatch(AUTHENTICATE_USER, {
        email: this.email,
        password: this.password,
      })
        .then(() => {
          loadingComponent.close();
          if (this.$store.state.login.error === null) {
            this.$router.push('/events');
          } else {
            this.error_snackbar();
          }
        });
    },
    error_snackbar() {
      this.$buefy.snackbar.open({
        duration: 3000,
        message: 'Wrong username or password',
        type: 'is-danger',
        position: 'is-top',
        actionText: 'Ok',
      });
    },
  },
};
</script>

<style scoped>

</style>
