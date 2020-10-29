<template>
  <div>
    <div class="has-text-left">
      <h1 class="title is-2" id="main-title">My Trips</h1>
    </div>
    <b-tabs size="is-medium" type="is-boxed" class="block" id="tab-container">
      <b-tab-item label="My Trips" icon="google-photos">
        Mis Viajes
      </b-tab-item>
      <b-tab-item label="All Trips" icon="google-photos">
        Todos los viajes
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: 'ViewTrip',
};
</script>

<style scoped>
  #main-title {
    margin-left: 5%;
  }
  #tab-container {
    margin-left: 5%;
    margin-top: 25px;
  }
</style>
