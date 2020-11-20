<template>
  <b-carousel
    :indicator-inside="false"
  >
    <b-carousel-item
      v-for="(carousel, i) in carousels"
      :key="i"
    >
      <div class="hero is-light">
        <div
          class="columns is-gapless is-vcentered mx-4 my-4"
        >
          <div class="column is-5">
            <img
              :src="carousel.imagePath"
              alt="image"
            >
          </div>
          <div class="column">
            <div class="hero">
              <div class="hero-body has-text-left">
                <h1 class="title is-4">
                  {{carousel.name}}
                </h1>
                <h2 class="subtitle is-5">
                  {{carousel.description}}
                </h2>
                <h2 class="subtitle is-5">
                  {{carousel.personalType}}, ${{carousel.price}}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-carousel-item>
  </b-carousel>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EventCarousel',
  data() {
    return {
      carousels: [],
    };
  },
  mounted() {
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/event`, {
      params: {
        offset: 0,
        limit: 7,
      },
    })
      .then((response) => {
        response.data.forEach((event) => {
          this.carousels.push({
            name: `${event.city}, ${event.country}`,
            description: event.description,
            imagePath: event.image,
            personalType: event.personal_type,
            price: event.price,
          });
        });
      });
  },
};
</script>
