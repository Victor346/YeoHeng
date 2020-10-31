<template>
  <div class="container">
    <h2 class="title is-3" style="margin-top: 2%;">
      Edit your trip
    </h2>
    <section>
      <div class="columns">
        <div class="column is-three-fifths">
          <form @submit.prevent="handleSubmit">
            <div class="columns">
              <div class="column">
                <b-field label="Name">
                  <b-input
                    v-model="name"
                    required
                  />
                </b-field>
                <div class="columns">
                  <div class="column">
                    <b-field label="Start Date">
                      <b-datepicker
                        style="z-index: 21;"
                        placeholder="Click to select..."
                        v-model="startDate"
                        :min-date="minDate"
                        :max-date="maxDate">
                      </b-datepicker>
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field label="End Date">
                      <b-datepicker
                        style="z-index: 21;"
                        placeholder="Click to select..."
                        v-model="endDate"
                        :min-date="startDate"
                        :max-date="maxDate">
                      </b-datepicker>
                    </b-field>
                  </div>
                </div>
                <b-field label="Price (USD)">
                  <b-input
                    v-model="price"
                    placeholder="00.00"
                    icon="currency-usd"
                    type="number"
                    min="0"
                    step=".01"
                    required
                  ></b-input>
                </b-field>
                <div class="columns">
                  <div class="column">
                    <b-field label="Is your trip private?">
                      <b-switch v-model="isPrivate">
                      </b-switch>
                    </b-field>
                  </div>
                  <div class="column">
                    <button
                      type="submit"
                      class="button is-primary is-medium"
                    >Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <Calendar
            :startDate="startDate"
            :calendar-events="this.events"
            ref="calendar"
          />
        </div>
        <div class="column">
          <EventScroller :city="city" :country="country" @push-event="pushEvent"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Calendar from '@/components/trips/Calendar.vue';
import EventScroller from '@/components/trips/EventScroller.vue';
import axios from 'axios';

export default {
  name: 'TripEdition',
  components: {
    Calendar,
    EventScroller,
  },
  data() {
    const endDate = new Date();
    const minDate = new Date();
    const maxDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    minDate.setFullYear(minDate.getFullYear() - 1);
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    return {
      name: null,
      startDate: null,
      endDate,
      minDate,
      maxDate,
      price: null,
      isPrivate: false,
      city: null,
      country: null,
      events: [
        /* {
          from: '2020-10-30T19:00:00Z',
          to: '2020-10-30T21:00:00Z',
          data: 'Olive & Dick',
        }, */
      ],
    };
  },
  mounted() {
    const loadingComponent = this.$buefy.loading.open({
      container: this.$refs.container,
    });
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/trip/${this.$route.params.id}`)
      .then((res) => {
        this.country = res.data.destination.split(',')[1].trim();
        this.city = res.data.destination.split(',')[0].trim();
        this.name = res.data.name;
        const offset = new Date().getTimezoneOffset();
        this.startDate = new Date(Date.parse(res.data.start_date) + (offset * 60 * 1000));
        this.endDate = new Date(Date.parse(res.data.end_date) + (offset * 60 * 1000));
        this.price = res.data.budget;

        res.data.events.forEach((event) => {
          axios.get(`${process.env.VUE_APP_BACKEND_URL}/event/${event.event_id.$oid}`)
            .then((eventRes) => {
              this.events.push({
                data: eventRes.data.name,
                to: new Date(Date.parse(event.start_date) + event.duration).toISOString(),
                from: new Date(Date.parse(event.start_date)).toISOString(),
              });
              this.$refs.calendar.$kalendar.addNewEvent({
                data: eventRes.data.name,
                to: new Date(Date.parse(event.start_date) + event.duration).toISOString(),
                from: new Date(Date.parse(event.start_date)).toISOString(),
              });
            });
        });

        loadingComponent.close();
      });
  },
  methods: {
    setName(name) { this.name = name; },
    setStartDate(startDate) { this.startDate = startDate; },
    setEndDate(endDate) { this.endDate = endDate; },
    pushEvent(event) {
      const from = new Date(event.from).toISOString();

      const offset = new Date().getTimezoneOffset();
      const calendarFrom = new Date(Date.parse(from) - (offset * 60 * 1000)).toISOString();
      const timeString = event.time.split(' ');
      const hours = parseInt(timeString[0], 10) * 3600 * 1000;
      const minutes = parseInt(timeString[2], 10) * 60 * 1000;
      const calendarFinishTime = new Date(
        Date.parse(from) + (hours + minutes) - (offset * 60 * 1000),
      ).toISOString();

      const data = {
        _id: { $oid: this.$route.params.id },
        event_id: { $oid: event.id },
        start_date: calendarFrom,
        start_hour: calendarFrom,
        duration: (hours + minutes),
      };

      axios.put(`${process.env.VUE_APP_BACKEND_URL}/trip/add`, data, {
        headers: {
          Authorization: `Bearer ${this.$store.state.login.token}`,
        },
      })
        .then(() => {
          this.events.push({
            ...event,
            to: calendarFinishTime,
            from: event.from.toISOString(),
          });
          // TODO: El calendario esta 6 horas adelantado por UTC.
          this.$refs.calendar.$kalendar.addNewEvent({
            ...event,
            data: event.title,
            to: calendarFinishTime,
            from: calendarFrom,
          });
        });
    },
    handleSubmit() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.container,
      });
      const data = {
        _id: this.$route.params.id,
        name: this.name,
        start_date: new Date(this.startDate.setUTCHours(0, 0, 0, 0)).toISOString(),
        end_date: new Date(this.startDate.setUTCHours(0, 0, 0, 0)).toISOString(),
        private: this.isPrivate,
        budget: parseInt(this.price, 10),
      };
      axios.put(`${process.env.VUE_APP_BACKEND_URL}/trip`, data, {
        headers: {
          Authorization: `Bearer ${this.$store.state.login.token}`,
        },
      })
        .then(() => {
          loadingComponent.close();
          this.$buefy.snackbar.open({
            duration: 10000,
            message: 'Changes to trip saved successfully',
            position: 'is-top',
            actionText: 'Ok',
          });
        })
        .catch(() => {
          loadingComponent.close();
          this.$buefy.snackbar.open({
            duration: 10000,
            message: 'An error has ocurred while saving your changes',
            type: 'is-danger',
            position: 'is-top',
            actionText: 'Retry',
            onAction: () => this.handleSubmit(),
          });
        });
    },
  },
};
</script>

<style scoped>
.kalendar-wrapper {
  min-height: 20px;
  padding: 20px;
}
.sticky-top {
  z-index: 0 !important;
}
.overflow {
  /* overflow: scroll; */
}

.dropdown-menu {
  z-index: 30 !important;
}
</style>
