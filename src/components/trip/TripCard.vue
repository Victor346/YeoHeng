<template>
  <div v-on:click="handleClick" style="min-width: 32%; margin-bottom: 10px">
    <div class="card">
      <b-modal v-model="isModalActive">
        <form @submit.prevent="handleFork">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Enter the details for your trip</p>
              <button
                type="button"
                class="delete"
                @click="isModalActive=false"/>
            </header>
            <section class="modal-card-body">
              <b-field label="New name">
                <b-input
                  type="text"
                  placeholder="New name"
                  v-model="fork_name"
                  required>
                </b-input>
              </b-field>

              <b-field label="New Start Date">
                <b-datepicker
                  v-model="fork_start_date"
                  placeholder="Click to select..."
                  icon="calendar-today"
                  trap-focus>
                </b-datepicker>
              </b-field>

              <b-checkbox>Remember me</b-checkbox>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="isModalActive=false">Close</button>
              <button
                class="button is-success"
                type="submit"
                expanded>Fork
              </button>
            </footer>
          </div>
        </form>
      </b-modal>
      <b-button
        v-if="type !== 'PERSONAL' && this.$store.state.login.token !== null"
        class="forkButton"
        type="is-success"
        icon-right="content-copy"
        @click="isModalActive=true"
      >
        Fork
      </b-button>
      <div
        class="card-image is-hidden-mobile"
        style="margin-bottom: -20%"
      >
        <figure class="image is-16by9">
          <img
            class="desktop-image"
            :src="imgUrl"
            alt="Event image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left is-hidden-desktop">
            <figure class="image is-48x48">
              <img
                src="../../assets/yeoheng_logo.png"
                alt="Event image"
              />
            </figure>
          </div>
          <div class="media-content">
            <h1 class="title is-3">
              {{trip.name}}
            </h1>
            <h2 class="subtitle is-4">
              {{trip.destination}}
            </h2>
          </div>
        </div>
        <div class="content has-text-left columns">
          <div class="column">
            <p><b class="is-size-6">Budget:</b> ${{trip.budget}}</p>
            <p><b class="is-size-6">Start:</b>
              {{new Date(trip.start_date).toDateString()}}
            </p>
          </div>
          <div class="column">
            <p><b class="is-size-6"># of events:</b> {{trip.events.length}}</p>
            <p><b class="is-size-6">End:</b>
              {{new Date(trip.end_date).toDateString()}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TripCard',
  data() {
    return {
      imgUrl: '',
      fork_name: '',
      fork_start_date: null,
      isModalActive: false,
    };
  },
  async mounted() {
    // eslint-disable-next-line global-require
    this.imgUrl = require('../../assets/yeoheng_logo_double.png');
  },
  props: {
    type: String,
    trip: {
      id: String,
      name: String,
      start_date: String,
      end_date: String,
      budget: Number,
      destination: String,
      events: [{
        id: String,
        event_id: String,
        start_date: String,
        start_hour: String,
        duration: Number,
      }],
    },
  },
  methods: {
    retrieveImg() {
      console.log('');
    },
    handleClick() {
      if (this.type === 'PERSONAL') {
        this.$router.push(`/trip/edit/${this.trip.id}`);
      }
    },
    handleFork() {
      const data = {
        name: this.fork_name,
        start_date: this.fork_start_date.toISOString(),
        to_fork_trip_id: this.trip.id,
      };
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/trip/fork`, data, {
        headers: {
          Authorization: `Bearer ${this.$store.state.login.token}`,
        },
      }).then((response) => {
        this.$router.push(`/trip/edit/${response.data.$oid}`);
      }).catch(() => {
        this.$buefy.snackbar.open({
          message: 'Error Forking trip',
          type: 'is-danger',
          position: 'is-top',
          actionText: 'Retry',
          duration: 5000,
          onAction: () => {
            this.handleFork();
          },
        });
      });
    },
  },
};
</script>

<style scoped>
.desktop-image {
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1),
  rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,.2), rgba(0,0,0,0));
  object-fit: cover;
}
.forkButton {
  position: absolute;
  left: 1%;
  top: 1%;
  z-index: 1;
}
</style>
