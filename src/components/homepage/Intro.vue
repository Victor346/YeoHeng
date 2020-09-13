<template>
  <div class="hero is-light is-bold">
    <div class="columns is-vcentered my-2">
      <div class="column is-10 ml-4">
        <h1 class="subtitle is-4">
          {{description}}
        </h1>
      </div>
      <div class="column">
        <img src="../../assets/yeoheng_logo.png" alt="logo"/>
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

</style>
