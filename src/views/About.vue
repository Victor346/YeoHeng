<template>
  <div class="about">
    <section>
      <h1 class="title is-2">YeoHeng 여행</h1>
    </section>

    <div class="hero is-light is-bold mx-4">
      <div class="columns is-vcentered my-2 mx-4">
        <div class="column is-8">
          <h1 class="title is-bold has-text-left">
            What is Yeoheng?
          </h1>
          <h1 class="subtitle is-4 has-text-left">
            {{description}}
          </h1>
          <h1 class="title is-bold has-text-left">
            Why Yeoheng?
          </h1>
          <h1 class="subtitle is-4 has-text-left">
            {{rationale}}
          </h1>
        </div>
        <div class="column">
          <img src="../assets/img/paris_home_2.jpg" alt="logo"/>
        </div>
      </div>
    </div>

    <section>
      <h1 class="title is-2">Contact Us</h1>
      <h3 class="subtitle is-4">In Joong Kim A01336967</h3>
      <h3 class="subtitle is-4">Victor Lopez Perez A01336434</h3>
      <h3 class="subtitle is-4">Fernando Rios Chávez A01020706</h3>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      description: 'In Yeoheng, you can plan your dream trips without going out of your home. '
        + 'Share your events and trips with other users of the world. '
        + 'You can decide if you want to share your events with other people, and establish a budget '
        + 'for your events. Happy Tripping!',
      rationale: 'Yeoheng is made for sharing your trips with the world. A combination of exciting '
        + 'events with different types for every type of personality.',
    };
  },
};
</script>

<style scoped>
section {
  padding: 1%;
}
h1, h2 {
  padding-top: 1%;
  padding-bottom: 1%;
}
</style>
