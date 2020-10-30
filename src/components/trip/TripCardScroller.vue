<template>
  <div ref="container">
    <b-pagination
      :total="total"
      v-model="current"
      order=""
      size=""
    >
    </b-pagination>
  <div class="cardContainer" >
    <TripCard v-for="(trip, i) in items" :key="trip.id + 'My' + i" :trip="trip"></TripCard>
  </div>
  </div>
</template>

<script>
import TripCard from '@/components/trip/TripCard.vue';

export default {
  name: 'TripCardScroller',
  components: {
    TripCard,
  },
  props: {
    type: String,
  },
  data() {
    return {
      total: 200,
      current: 1,
      perPage: 10,
      items: [
        {
          id: 'gdsafgsdf34fgsa',
          name: 'Mi Viaje Chidori',
          start_date: '2020-03-30',
          end_date: '2020-04-15',
          budget: 4353.34,
          destination: 'Paris, France',
          events: [{
            id: '3fsa53f3',
            event_id: 'fgerwq24',
            start_date: '2020-04-15',
            start_hour: '15:30',
            duration: 424,
          }],
        },
      ],
    };
  },
  methods: {
    infiniteHandler($state) {
      if (this.items.length > 50) { $state.loaded(); return; }
      this.items.slice(0, 5).forEach((event) => {
        this.items.push(event);
      });
      console.log(this.items);
      console.log('Touched bottom');
      $state.loaded();
      // $state.complete();
    },
  },
  watch: {
    current(val) {
      const page = val;
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.container,
      });
      setTimeout(() => loadingComponent.close(), 3 * 1000);
      console.log(page);
      return 100 - page;
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
