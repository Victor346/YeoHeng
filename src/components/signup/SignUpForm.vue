<template>
  <form @submit="handleSubmit">
    <b-field
      class="has-text-left"
      label="Name"
    >
      <b-input
        v-model="name"
        placeholder="Insert your name"
        icon="account"
        maxlength="30"
        required
      >
      </b-input>
    </b-field>

    <b-field
      class="has-text-left"
      label="Username"
    >
      <b-input
        v-model="username"
        placeholder="Insert your username"
        icon="account"
        maxlength="12"
        required
      >
      </b-input>
    </b-field>

    <b-field
      class="has-text-left"
      label="E-mail"
    >
      <b-input
        v-model="email"
        placeholder="Email"
        type="email"
        icon="email"
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
      class="has-text-left"
      label="Confirm password"
    >
      <b-input
        type="password"
        placeholder="Repeat your password"
        required
      >
      </b-input>
    </b-field>

    <b-field
      position="is-centered"
    >
        <button
          class="button is-info"
          type="submit"
        >
          Register
        </button>
    </b-field>
  </form>
</template>

<script>
import { REGISTER_USER } from '@/store/actions/types';

export default {
  name: 'SignUpForm',
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const loadingComponent = this.$buefy.loading.open({
        container: null,
      });
      this.$store.dispatch(REGISTER_USER, {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
      })
        .then(() => {
          loadingComponent.close();
          if (this.$store.state.login.error === null) {
            this.$router.push('/events');
          } else {
            let message = 'An error occurred while registering the user';
            if (this.$store.state.login.error === 'User is already registered') {
              message = 'An user with the same email or username already exists';
            }
            this.error_snackbar(message);
          }
        });
    },
    error_snackbar(message) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message,
        type: 'is-danger',
        position: 'is-top',
        actionText: 'Ok',
      });
    },
  },
};
</script>
