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
      console.log('Holad');
    },
  },
};
</script>
