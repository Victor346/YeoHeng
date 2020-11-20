<template>
  <div class="hero is-light is-bold">
    <div class="columns is-vcentered my-2 mx-4">
      <div class="column is-2 is-hidden-mobile">
        <img src="../../assets/img/paris_home.jpg" alt="logo"/>
      </div>
      <div class="column is-8">
        <h1 class="subtitle is-4">
          {{description}}
        </h1>
      </div>
      <div class="column">
        <img src="../../assets/img/paris_home_2.jpg" alt="logo"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  data() {
    return {
      description: 'In Yeoheng, you can plan your dream trips without going out of your home. '
        + 'Share your events and trips with other users of the world. '
        + 'You can decide if you want to share your events with other people, and establish a budget '
        + 'for your events. Happy Tripping!',
    };
  },
};
</script>
