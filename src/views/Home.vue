<template>

  <div class="home">

    <section class="intro has-text-left">
      <h1 class="title is-2">YeoHeng 여행</h1>
      <Intro />
    </section>

    <section>
      <div class="columns">
        <div class="column is-half">
          <h1 class="subtitle is-3">Eventos</h1>
          <EventCarousel />
        </div>
        <div class="column">
          <h1 class="subtitle is-3">Viajes</h1>
          <TripCarousel />
        </div>
      </div>
    </section>

  </div>

</template>

<script>
// @ is an alias to /src
import Intro from '@/components/homepage/Intro.vue';
import EventCarousel from '@/components/homepage/EventCarousel.vue';
import TripCarousel from '@/components/homepage/TripCarousel.vue';

export default {
  name: 'Home',
  components: {
    EventCarousel,
    TripCarousel,
    Intro,
  },
};
</script>

<style scoped>
section {
  padding: 2%;
}
</style>
