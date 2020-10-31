<template>
  <div>
    <div id="filters">
      <h4 class="title is-4">Filtros</h4>
      <div class="has-text-left">
        <b-field label="Tags">
          <b-taginput
            v-model="tags"
            type="is-danger">
          </b-taginput>
        </b-field>

        <b-field label="Category">
          <b-select v-model="category" placeholder="Select a category">
            <option
              v-for="option in categories"
              :value="option.name"
              :key="option.id"
            >
              {{ option.name }}
            </option>
          </b-select>
        </b-field>
        <b-button type="is-primary" @click="getAllEvents">Apply Filters</b-button>
      </div>
    </div>
    <b-button type="is-success" expanded style="margin-bottom: 15px;"
              @click="isComponentModalActive = true">
      Add a new Event
    </b-button>
    <b-modal v-model="isComponentModalActive">
      <EventCreation style="background-color: #e3e3e3; padding: 15px; border-radius: 5px;"/>
    </b-modal>
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
  </div>
</template>

<script>
import NewEventCard from '@/components/events/NewEventCard.vue';
import EventCreation from '@/views/events/EventCreation.vue';
import axios from 'axios';

export default {
  name: 'EventScroller',
  components: { NewEventCard, EventCreation },
  props: {
    originalFrom: String,
    city: String,
    country: String,
  },
  data() {
    return {
      events: [],
      tags: [],
      isComponentModalActive: false,
      category: null,
      categories: [
        {
          name: '',
          id: 0,
        },
        {
          name: 'Culture',
          id: 1,
        },
        {
          name: 'Sports',
          id: 2,
        },
        {
          name: 'Food',
          id: 3,
        },
      ],
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
      params.append('country', this.country);
      params.append('city', this.city);
      if (this.tags.length > 0) {
        params.append('tags', this.tags.join());
      }
      if (this.category !== null && this.category !== '') {
        params.append('personal_type', this.category);
      }
      console.log(params.toString());
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
                if (!event.private) { return; }
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
    },
  },
  watch: {
    city() {
      if (this.country === null) { return; }
      this.getAllEvents();
    },
    country() {
      if (this.city === null) { return; }
      this.getAllEvents();
    },
  },
};
</script>

<style scoped>
#content {
  height: 800px;
  overflow: auto;
  border-radius: 4px;
}
#filters {
  background-color: white;
  margin-bottom: 15px;
  border-radius: 4px;
  margin-top: 2rem;
  padding: 0.5rem;
}
</style>
