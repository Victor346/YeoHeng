<template>
  <div>
    <div v-if="this.$store.state.login.token != null">
    <section class="has-text-left" style="padding-top: 0;">
      <div class="has-text-left">
        <h1 class="title is-2">My events</h1>
      </div>
      <div  style="margin-top: 10px;">
        <b-button tag="router-link" to="/event/new" type="is-success">
          Register a new event
        </b-button>
        <b-button @click="getPrivateEvents('PREVIOUS')"
                  style="margin-left: 4px;" icon-left="arrow-left">
        </b-button>
        <b-button @click="getPrivateEvents('NEXT')"
                  style="margin-left: 4px;" icon-left="arrow-right">
        </b-button>
      </div>
    </section>
    <section>
      <div class="columns" style="flex-wrap: wrap">
        <EventCard v-for="privateEvent in privateEvents" :event="privateEvent"
                   :key="privateEvents.indexOf(privateEvent)"/>
        <div v-if="privateEvents.length === 0" class="container" style="margin-top: 15px;
             margin-bottom: 15px;">
          <h4 class="title is-4">
            You have not registered any event yet</h4>
        </div>
      </div>
    </section>
    </div>
    <section class="has-text-left" style="padding-top: 10px;">
      <div class="has-text-left">
        <h1 class="title is-2">All events</h1>
      </div>
      <div  style="margin-top: 10px;">
        <b-button @click="getAllEvents('PREVIOUS')"
                  style="margin-left: 4px;" icon-left="arrow-left">
        </b-button>
        <b-button @click="getAllEvents('NEXT')"
                  style="margin-left: 4px;" icon-left="arrow-right">
        </b-button>
      </div>
    </section>
    <section>
      <div class="columns" style="flex-wrap: wrap">
        <EventCard v-for="event in events" :event="event" :key="events.indexOf(event)"/>
      </div>
    </section>
  </div>
</template>

<script>
import EventCard from '@/components/events/EventCard.vue';
import axios from 'axios';

export default {
  name: 'ViewEvent',
  data() {
    return {
      privateLimit: 4,
      privateOffset: 0,
      privateEvents: [],
      limit: 4,
      offset: 0,
      events: [],
    };
  },
  async mounted() {
    this.getAllEvents();
    this.getPrivateEvents();
  },
  methods: {
    getAllEvents(action) {
      switch (action) {
        case 'NEXT':
          this.offset += this.limit;
          break;
        case 'PREVIOUS':
          this.offset -= this.limit;
          if (this.offset < 0) {
            this.offset = 0;
          }
          break;
        default:
          break;
      }
      const params = new URLSearchParams();
      params.append('limit', this.limit);
      params.append('offset', this.offset);

      axios.get(`${process.env.VUE_APP_BACKEND_URL}/event`, { params })
        .then((result) => {
          if (result.data.length !== 0) {
            this.events = [];
            result.data.forEach((event) => {
              this.events.push({
                title: event.name,
                price: event.price,
                city: event.city,
                country: event.country,
                time: event.duration,
                imgUrl: event.image,
                description: event.description,
                category: event.personal_type,
                tags: event.tags,
              });
            });
          } else {
            switch (action) {
              case 'NEXT':
                this.offset -= this.limit;
                break;
              case 'PREVIOUS':
                this.offset += this.limit;
                break;
              default:
                break;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPrivateEvents(action) {
      if (this.$store.state.login.token != null) {
        switch (action) {
          case 'NEXT':
            this.privateOffset += this.privateLimit;
            break;
          case 'PREVIOUS':
            this.privateOffset -= this.privateLimit;
            if (this.privateOffset < 0) {
              this.privateOffset = 0;
            }
            break;
          default:
            break;
        }
        const privateParams = new URLSearchParams();
        privateParams.append('limit', this.privateLimit);
        privateParams.append('offset', this.privateOffset);
        privateParams.append('user_id', this.$store.state.login.id);

        axios.get(`${process.env.VUE_APP_BACKEND_URL}/event`, { params: privateParams })
          .then((res) => {
            if (res.data.length !== 0) {
              this.privateEvents = [];
              res.data.forEach((event) => {
                this.privateEvents.push({
                  title: event.name,
                  price: event.price,
                  city: event.city,
                  country: event.country,
                  time: event.duration,
                  imgUrl: event.image,
                  description: event.description,
                  category: event.personal_type,
                  tags: event.tags,
                });
              });
            } else {
              switch (action) {
                case 'NEXT':
                  this.privateOffset -= this.privateLimit;
                  break;
                case 'PREVIOUS':
                  this.privateOffset += this.privateLimit;
                  break;
                default:
                  break;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  components: {
    EventCard,
  },
  beforeRouteUpdate(to, from, next) {
    this.getAllEvents();
    this.getPrivateEvents();
    next();
  },
};
</script>

<style scoped>
section {
  padding-top: 1%;
  padding-left: 2%;
  padding-right: 2%;
}
</style>
