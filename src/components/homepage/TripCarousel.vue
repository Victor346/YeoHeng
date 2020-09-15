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
              </div>
            </div>
          </div>
          <div class="column">
            <img
              :src="carousel.imagePath"
              alt="image"
            >
          </div>
        </div>
      </div>
    </b-carousel-item>
  </b-carousel>
</template>

<script>
export default {
  name: 'TripCarousel',
  data() {
    return {
      trips: [
        {
          name: 'Trip 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            + 'Nullam ac ultricies risus, eu tincidunt ante. Quisque quis magna nunc. ',
          imagePath: 'https://picsum.photos/id/4/1230/500',
        },
        {
          name: 'Trip 2',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            + 'Nullam ac ultricies risus, eu tincidunt ante. Quisque quis magna nunc. ',
          imagePath: 'https://picsum.photos/id/4/1230/500',
        },
        {
          name: 'Trip 3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            + 'Nullam ac ultricies risus, eu tincidunt ante. Quisque quis magna nunc. ',
          imagePath: 'https://picsum.photos/id/4/1230/500',
        },
        {
          name: 'Trip 4',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            + 'Nullam ac ultricies risus, eu tincidunt ante. Quisque quis magna nunc. ',
          imagePath: 'https://picsum.photos/id/4/1230/500',
        },
      ],
    };
  },
};
</script>
