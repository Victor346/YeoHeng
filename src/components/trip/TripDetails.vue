<template>
  <div>
    <div class="has-text-left">
      <h1 class="title is-2" id="main-title">{{ name }}</h1>
    </div>
    <div class="columns" id="tripInfo">
      <div class="column">
        <b>Destination: </b>{{ destination }}
      </div>
      <div class="column">
        <b>Start Date: </b>{{ startDate }}
      </div>
      <div class="column">
        <b>End Date: </b>{{ endDate }}
      </div>
      <div class="column">
        <b>Budget: </b>{{ budget }}
      </div>
    </div>
    <div class="cardContainer">
      <NewEventCard></NewEventCard>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NewEventCard from '@/components/events/NewEventCard.vue';

export default {
  name: 'TripDetails',
  components: { NewEventCard },
  props: {
    propsTripId: String,
  },
  mounted() {
    this.tripId = this.propsTripId == null ? this.$router.currentRoute.params.id : this.propsTripId;
    this.getTripDetails();
  },
  data() {
    return {
      tripId: null,
      name: '',
      startDate: '',
      endDate: '',
      budget: '',
      destination: '',
      events: [],
    };
  },
  methods: {
    getTripDetails() {
      axios.get(`${process.env.VUE_APP_BACKEND_URL}/trip/${this.tripId}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.login.token}`,
        },
      }).then((response) => {
        const { data } = response;
        console.log(data);
        this.name = data.name;
        this.startDate = new Date(data.start_date).toDateString();
        this.endDate = new Date(data.end_date).toDateString();
        this.budget = data.budget;
        this.destination = data.destination;
        data.events.forEach((event) => {
          console.log(event);
        });
      });
    },
  },
};
</script>

<style scoped>
#main-title {
  margin-left: 5%;
}
#tripInfo{
  margin-top: 2%;
  font-size: 18px;
}
</style>
