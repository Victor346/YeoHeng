<template>
  <div v-on:click="handleClick" style="min-width: 32%; margin-bottom: 10px">
    <div class="card">
      <div
        class="card-image is-hidden-mobile"
        style="margin-bottom: -20%"
      >
        <figure class="image is-16by9">
          <img
            class="desktop-image"
            :src="imgUrl"
            alt="Event image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left is-hidden-desktop">
            <figure class="image is-48x48">
              <img
                :src="imgUrl"
                alt="Event image"
              />
            </figure>
          </div>
          <div class="media-content">
            <h1 class="title is-3">
              {{trip.name}}
            </h1>
            <h2 class="subtitle is-4">
              {{trip.destination}}
            </h2>
          </div>
        </div>
        <div class="content has-text-left columns">
          <div class="column">
            <p><b class="is-size-5">Budget:</b> ${{trip.budget}}</p>
            <p><b class="is-size-5">Start:</b> {{trip.start_date}}</p>
          </div>
          <div class="column">
            <p><b class="is-size-5"># of events:</b> {{trip.events.length}}</p>
            <p><b class="is-size-5">End:</b> {{trip.end_date}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripCard',
  data() {
    return {
      imgUrl: '',
    };
  },
  async mounted() {
    this.imgUrl = 'https://media1.tenor.com/images/a8b6a5195b658b2e8882383e44083023/tenor.gif?itemid=18439707';
  },
  props: {
    type: String,
    trip: {
      id: String,
      name: String,
      start_date: String,
      end_date: String,
      budget: Number,
      destination: String,
      events: [{
        id: String,
        event_id: String,
        start_date: String,
        start_hour: String,
        duration: Number,
      }],
    },
  },
  methods: {
    retrieveImg() {
      console.log('');
    },
    handleClick() {
      if (this.type === 'PERSONAL') {
        this.$router.push(`/trip/edit/${this.trip.id}`);
      }
    },
  },
};
</script>

<style scoped>
.desktop-image {
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1),
  rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,.2), rgba(0,0,0,0));
  object-fit: cover;
}
</style>
