<template>
  <div>
    <h1 v-if="isSuccess" class="title is-4">Private Event</h1>
    <b-button
      v-else
      class="is-warning is-rounded"
      icon-left="alert-decagram"
      size="is-large"
      @click="forcePrivate"
    >
      Force Private
    </b-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ForcePrivateButton',
  data() {
    return {
      isSuccess: false,
    };
  },
  props: {
    id: String,
  },
  methods: {
    forcePrivate() {
      axios.put(`${process.env.VUE_APP_BACKEND_URL}/event/forceprivate/${this.id}`, null, {
        headers: {
          Authorization: `Bearer ${this.$store.state.login.token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          this.isSuccess = true;
          this.success_snackbar();
        })
        .catch(() => this.error_snackbar());
    },
    success_snackbar() {
      this.$buefy.snackbar.open({
        message: 'The event has been handled successfully',
        position: 'is-top',
      });
    },
    error_snackbar() {
      this.$buefy.snackbar.open({
        duration: 10000,
        message: 'An error has ocurred while forcing private this event',
        type: 'is-danger',
        position: 'is-top',
        actionText: 'Retry',
        onAction: () => this.forcePrivate(),
      });
    },
  },
};
</script>

<style scoped>

</style>
