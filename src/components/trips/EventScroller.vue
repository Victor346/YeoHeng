<template>
  <div id="content">
    <div v-for="event in events" :key="events.indexOf(event)">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{event.data}}</p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
            <div class="media-right">
              <b-button class="is-success" @click="addEvent(event)">Add</b-button>
            </div>
          </div>
          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris.
            <br>
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
export default {
  name: 'EventScroller',
  data() {
    return {
      events: [
        {
          from: new Date('2020-11-01T11:00'),
          data: 'Push Test 1',
        },
        {
          from: new Date('2020-10-31T14:00'),
          data: 'Push Test 2',
        },
        {
          from: new Date('2020-11-01T14:00'),
          data: 'Push Test 3',
        },
        {
          from: new Date('2020-11-02T11:00'),
          data: 'Push Test 4',
        },
      ],
    };
  },
  methods: {
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
