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
      <NewEventCard v-for="(event, i) in events" :event="event"
                    :key="event.id + 'My' + i"
                    style="margin-bottom: 10px;"></NewEventCard>
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
          axios.get(`${process.env.VUE_APP_BACKEND_URL}/event/${event.event_id.$oid}`)
            .then((res) => {
              const eventRes = res.data;
              this.events.push({
                // eslint-disable-next-line no-underscore-dangle
                id: eventRes._id.$oid,
                title: eventRes.name,
                price: eventRes.price,
                city: eventRes.city,
                country: eventRes.country,
                time: eventRes.duration,
                imgUrl: eventRes.image,
                description: eventRes.description,
                category: eventRes.personal_type,
                tags: eventRes.tags,
              });
            });
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
.cardContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
}
</style>
