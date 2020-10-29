<template>
  <div>
    <kalendar
      class="overflow"
      :configuration="calendar_settings"
      :events.sync="events"
    >
      <div slot="created-card" slot-scope="{ event_information }" class="details-card">
        <h4 class="appointment-title">{{event_information.data}}</h4>
        <small class="appointment-description">
          {{event_information.data}}
        </small>
        <span>
          {{new Date(event_information.start_time).getHours()}} :
          {{new Date(event_information.start_time).getMinutes()}} -
          {{new Date(event_information.end_time).getHours() }} :
          {{new Date(event_information.end_time).getMinutes()}}
        </span>
      </div>
    </kalendar>
    <p>{{JSON.stringify(this.events)}}</p>
  </div>
</template>

<script>
import { Kalendar } from 'kalendar-vue';

export default {
  name: 'Calendar',
  components: {
    Kalendar,
  },
  props: {
    calendarEvents: Array,
  },
  data() {
    return {
      calendar_settings: {
        style: 'flat_design',
        view_type: 'week',
        cell_height: 6,
        scrollToNow: true,
        start_day: new Date().toISOString(),
        read_only: true,
        day_starts_at: 7,
        day_ends_at: 24,
        overlap: false,
        hide_dates: ['2019-10-31'], // Spooky
        past_event_creation: true,
      },
      events: this.calendarEvents,
    };
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
</style>
