<template>
  <div class="home">

    <NavBar />

    <section class="intro has-text-left">
      <h1 class="title is-2">YeoHeng 여행</h1>
      <Intro />
    </section>

    <section>
      <h1 class="subtitle is-3">Eventos</h1>
      <EventCarousel/>
    </section>

    <section>
      <h1 class="subtitle is-3">Viajes</h1>
      <h1 class="subtitle"> TODO: Trip Carousel   </h1>
    </section>

    <Footer />

  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/layout/NavBar.vue';
import Footer from '@/components/layout/Footer.vue';
import EventCarousel from '@/components/homepage/EventCarousel.vue';
import Intro from '@/components/homepage/Intro.vue';

export default {
  name: 'Home',
  components: {
    NavBar,
    Footer,
    EventCarousel,
    Intro,
  },
};
</script>

<style scoped>
section {
  margin: 2%;
}
</style>
