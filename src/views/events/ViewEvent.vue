<template>
  <div>
    <section class="has-text-left">
      <h1 class="title is-2">Mis eventos</h1>
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

export default {
  name: 'ViewEvent',
  data() {
    return {
      events: [
        {
          title: 'Titulo',
          price: '2342',
          city: 'city',
          country: 'country',
          time: '03:00',
          imgUrl: 'https://yeoheng-itesm-2020.s3.amazonaws.com/temp/kum.jpg',
          description: 'description',
          category: 'category',
          tags: ['tags', 'commie'],
        },
        {
          title: 'Titulo 2',
          price: '6666',
          city: 'vule',
          country: 'france',
          time: '16:00',
          imgUrl: 'https://yeoheng-itesm-2020.s3.amazonaws.com/Vc346/events/81fb2979-f290-4a0c-97a8-e32ff6673b29.jpg',
          description: 'description 2',
          category: 'cultural',
          tags: ['tags', 'pepe', 'pepon'],
        },
      ],
    };
  },
  components: {
    EventCard,
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
