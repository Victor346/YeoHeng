<template>
  <b-carousel
    :indicator-inside="false"
    :indicator-background="true"
  >
    <b-carousel-item
      v-for="(carousel, i) in carousels"
      :key="i"
    >
      <div class="hero is-light">
        <div class="columns is-gapless is-vcentered mx-4 my-4">
          <div class="column is-4">
            <img
              :src="carousel.imagePath"
              alt="image"
            >
          </div>
          <div class="column">
            <div class="hero">
              <div class="hero-body has-text-left">
                <h1 class="title">
                  {{carousel.name}}
                </h1>
                <h2 class="subtitle">
                  {{carousel.description}}
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
export default {
  name: 'EventCarousel',
  data() {
    return {
      carousels: [
        {
          name: 'Event 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            + 'Nullam ac ultricies risus, eu tincidunt ante. Quisque quis magna nunc. '
            + 'Nunc tempus, urna non aliquam consequat, urna magna tincidunt tellus, '
            + 'in egestas odio orci eget turpis. ',
          imagePath: 'https://picsum.photos/id/4/1230/500',
        },
        {
          name: 'Event 2',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            + 'Nullam ac ultricies risus, eu tincidunt ante. Quisque quis magna nunc. '
            + 'Nunc tempus, urna non aliquam consequat, urna magna tincidunt tellus, '
            + 'in egestas odio orci eget turpis. ',
          imagePath: 'https://picsum.photos/id/4/1230/500',
        },
        {
          name: 'Event 3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            + 'Nullam ac ultricies risus, eu tincidunt ante. Quisque quis magna nunc. '
            + 'Nunc tempus, urna non aliquam consequat, urna magna tincidunt tellus, '
            + 'in egestas odio orci eget turpis. ',
          imagePath: 'https://picsum.photos/id/4/1230/500',
        },
        {
          name: 'Event 4',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
            + 'Nullam ac ultricies risus, eu tincidunt ante. Quisque quis magna nunc. '
            + 'Nunc tempus, urna non aliquam consequat, urna magna tincidunt tellus, '
            + 'in egestas odio orci eget turpis. ',
          imagePath: 'https://picsum.photos/id/4/1230/500',
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
