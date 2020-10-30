<template>
  <div class="container">
    <h2 class="title is-3">
      Edit your trip
    </h2>
    <section>
        <TripForm
          @set-name="setName"
          @set-start-date="setStartDate"
          @set-end-date="setEndDate"
        />
    </section>
    <section class="columns">
      <div class="column is-three-fifths">
        <Calendar
          :startDate="startDate"
          :calendar-events="this.events"
          ref="calendar"
        />
      </div>
      <div class="column">
        <EventScroller @push-event="pushEvent"/>
      </div>
    </section>
  </div>
</template>

<script>
import TripForm from '@/components/trips/TripForm.vue';
import Calendar from '@/components/trips/Calendar.vue';
import EventScroller from '@/components/trips/EventScroller.vue';

export default {
  name: 'TripEdition',
  components: {
    TripForm,
    Calendar,
    EventScroller,
  },
  data() {
    const currentDate = new Date();
    const endDate = new Date();
    const minDate = new Date();
    const maxDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    minDate.setFullYear(minDate.getFullYear() - 1);
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    return {
      name: null,
      startDate: currentDate,
      endDate,
      minDate,
      maxDate,
      price: 0,
      isPrivate: false,
      events: [
        /* {
          from: '2020-10-30T19:00:00Z',
          to: '2020-10-30T21:00:00Z',
          data: 'Olive & Dick',
        }, */
      ],
    };
  },
  methods: {
    setName(name) { this.name = name; },
    setStartDate(startDate) { this.startDate = startDate; },
    setEndDate(endDate) { this.endDate = endDate; },
    pushEvent(event) {
      const from = new Date(event.from).toISOString();
      const finishTime = new Date(Date.parse(from) + (3 * 3600 * 1000)).toISOString();

      const offset = new Date().getTimezoneOffset();
      const calendarFrom = new Date(Date.parse(from) - (offset * 60 * 1000)).toISOString();
      const calendarFinishTime = new Date(
        Date.parse(from) + (3 * 3600 * 1000) - (offset * 60 * 1000),
      ).toISOString();

      this.events.push({
        ...event,
        to: finishTime,
        from: event.from.toISOString(),
      });
      // TODO: El calendario esta 6 horas adelantado por UTC.
      this.$refs.calendar.$kalendar.addNewEvent({
        ...event,
        to: calendarFinishTime,
        from: calendarFrom,
      });
    },
  },
};
</script>

<style scoped>

</style>
