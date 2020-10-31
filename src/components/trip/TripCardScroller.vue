<template>
  <div ref="container">
    <b-pagination
      :total="total"
      v-model="current"
      :per-page="perPage"
    >
    </b-pagination>
  <div class="cardContainer" >
    <TripCard v-for="(trip, i) in items"
              :key="trip.id + 'My' + i"
              :trip="trip"
              :type="type"></TripCard>
  </div>
  </div>
</template>

<script>
import TripCard from '@/components/trip/TripCard.vue';
import axios from 'axios';

export default {
  name: 'TripCardScroller',
  components: {
    TripCard,
  },
  props: {
    type: String,
    trigger: Number,
  },
  data() {
    return {
      total: 0,
      current: 1,
      perPage: 9,
      items: [],
    };
  },
  async mounted() {
    this.retrieveCount();
  },
  methods: {
    retrieveCount() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.container,
      });
      const params = new URLSearchParams();
      params.append('limit', 1000000);
      params.append('offset', 0);
      if (this.type === 'PERSONAL') {
        params.append('user_id', this.$store.state.login.id);
      }
      axios.get(`${process.env.VUE_APP_BACKEND_URL}/trip/count`, { params })
        .then((res) => {
          this.total = res.data.event_count;
          this.retrieveItems(loadingComponent);
        });
    },
    retrieveItems(loadingElement) {
      const params = new URLSearchParams();
      params.append('limit', this.perPage);
      params.append('offset', (this.perPage * (this.current - 1)).toString());
      if (this.type === 'PERSONAL') {
        params.append('user_id', this.$store.state.login.id);
      }
      axios.get(`${process.env.VUE_APP_BACKEND_URL}/trip`, { params })
        .then((res) => {
          this.items = [];
          res.data.forEach((trip) => {
            const tempItem = {
              // eslint-disable-next-line no-underscore-dangle
              id: trip._id.$oid,
              name: trip.name,
              start_date: trip.start_date,
              end_date: trip.start_date,
              budget: trip.budget,
              destination: trip.destination,
              events: [],
            };
            trip.events.forEach((event) => {
              tempItem.events.push({
                // eslint-disable-next-line no-underscore-dangle
                id: event._id.$oid,
                event_id: event.event_id.$oid,
                start_date: event.start_date,
                start_hour: event.start_hour,
                duration: event.duration,
              });
            });
            this.items.push(tempItem);
          });
          loadingElement.close();
        });
    },
  },
  watch: {
    current() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.container,
      });
      this.retrieveItems(loadingComponent);
    },
    trigger() {
      this.retrieveCount();
    },
  },
};
</script>

<style scoped>
.cardContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
}
</style>
