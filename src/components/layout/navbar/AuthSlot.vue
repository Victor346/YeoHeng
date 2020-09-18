<template>
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
        :to="{ path: '/events' }"
        type="is-light"
      >
        Log In
      </b-button>
    </div>
  </b-navbar-item>
</template>

<script>
export default {
  name: 'AuthSlot',
};
</script>
