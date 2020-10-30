<template>
  <div id="content">
    <div v-for="event in events" :key="events.indexOf(event)" style="border-bottom: solid 1px">
      <div class="card">
        <div class="card-content">
          <div class="columns" style="margin-right: 2%; margin-left: 2%;">
            <div class="column is-19">
              <NewEventCard :event="event"
                         :key="event.id"/>
            </div>
            <div class="column is-2">
              <b-button class="is-success"
                        @click="addEvent(event)"
                        expanded
                        style="height: 100%;">+</b-button>
            </div>
          </div>
          <div class="content" style="margin-top: 7px;">
            <b-datetimepicker
              locale="es-MX"
              placeholder="Click to select..." v-model="event.from"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import NewEventCard from '@/components/events/NewEventCard.vue';
import axios from 'axios';

export default {
  name: 'EventScroller',
  components: { NewEventCard },
  props: {
    originalFrom: String,
  },
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.getAllEvents();
  },
  methods: {
    getAllEvents() {
      const loadingComponent = this.$buefy.loading.open({
        container: null,
      });
      const resultList = [];
      const params = new URLSearchParams();
      params.append('limit', 50);
      params.append('offset', 0);
      params.append('include_private', false);
      axios.get(`${process.env.VUE_APP_BACKEND_URL}/event`, { params })
        .then((result) => {
          result.data.forEach((event) => {
            resultList.push({
              // eslint-disable-next-line no-underscore-dangle
              id: event._id.$oid,
              title: event.name,
              price: event.price,
              city: event.city,
              country: event.country,
              time: event.duration,
              imgUrl: event.image,
              description: event.description,
              category: event.personal_type,
              tags: event.tags,
              from: this.originalFrom,
            });
          });
          params.delete('include_private');
          params.append('include_private', true);
          params.append('user_id', this.$store.state.login.id);

          axios.get(`${process.env.VUE_APP_BACKEND_URL}/event`, { params })
            .then((privateResult) => {
              privateResult.data.forEach((event) => {
                if (event.private) { return; }
                resultList.unshift({
                  // eslint-disable-next-line no-underscore-dangle
                  id: event._id.$oid,
                  title: event.name,
                  price: event.price,
                  city: event.city,
                  country: event.country,
                  time: event.duration,
                  imgUrl: event.image,
                  description: event.description,
                  category: event.personal_type,
                  tags: event.tags,
                  from: this.originalFrom,
                });
              });
              this.events = resultList;
              loadingComponent.close();
            });
        });
    },
    addEvent(event) {
      this.$emit('push-event', event);
      this.events.splice(this.events.indexOf(event), 1);
    },
  },
};
</script>

<style scoped>
#content {
  height: 800px;
  overflow: auto;
}
</style>
