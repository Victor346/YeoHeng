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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
        + 'Nullam ac ultricies risus, eu tincidunt ante. Quisque quis magna nunc. '
        + 'Nunc tempus, urna non aliquam consequat, urna magna tincidunt tellus, '
        + 'in egestas odio orci eget turpis. ',
    };
  },
};
</script>

<style scoped>
img {
}
</style>
