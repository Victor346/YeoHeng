<template>
  <b-carousel
    :indicator-inside="false"
  >
    <b-carousel-item
      v-for="(carousel, i) in trips"
      :key="i"
    >
      <div class="hero is-light">
        <div
          class="columns is-gapless is-vcentered mx-4 my-4"
          id="event-card"
        >
          <div class="column is-7">
            <div class="hero">
              <div class="hero-body">
                <h1 class="title is-4">
                  {{carousel.name}}
                </h1>
                <h2 class="subtitle is-5">
                  {{carousel.description}}
                </h2>
                <h2 class="subtitle is-5">
                  Budget: ${{carousel.budget}}
                </h2>
              </div>
            </div>
          </div>
          <div class="column">
            <img
              :src="require('../../assets/img/paris_home_2.jpg')"
              alt="image"
            >
          </div>
        </div>
      </div>
    </b-carousel-item>
  </b-carousel>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TripCarousel',
  data() {
    return {
      trips: [],
    };
  },
  mounted() {
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/trip`, {
      params: {
        offset: 0,
        limit: 5,
      },
    })
      .then((response) => {
        response.data.forEach((trip) => {
          console.log(trip);
          this.trips.push({
            name: trip.name,
            description: trip.destination,
            budget: trip.budget,
            imagePath: 'https://picsum.photos/id/4/1230/500',
          });
        });
      });
  },
};
</script>
