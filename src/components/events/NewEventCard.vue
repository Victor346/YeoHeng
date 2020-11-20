<template>
  <div class="">

    <b-modal v-model="isModalActive">
      <div class="modal-card" style="width: auto">
        <section class="modal-card-body">
          <EventViewById :idProp="event.id"></EventViewById>
        </section>
      </div>
    </b-modal>
    <div class="card">
      <div
        class="card-image is-hidden-mobile"
        style="margin-bottom: -20%"
        @click="moveToView"
      >
        <figure class="image is-16by9">
          <img
            class="desktop-image"
            :src="event.imgUrl"
            alt="Event image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left is-hidden-desktop">
            <figure class="image is-48x48">
              <img
                :src="event.imgUrl"
                alt="Event image"
              />
            </figure>
          </div>
          <div class="media-content">
            <h1 class="title is-5">
              {{event.title}} (${{event.price}})
            </h1>
            <h2 class="subtitle is-5">
              {{event.city}}, {{event.country}}
            </h2>
          </div>
        </div>
        <div class="content has-text-left">
          <p>
            {{event.description}}
          </p>
          <b-taglist>
            <b-tag v-for="tag in event.tags"
                   :key="event.tags.indexOf(tag)"
                   type="is-success"
            >
              {{tag}}
            </b-tag>
          </b-taglist>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            {{event.category}}
          </p>
          <p class="card-footer-item">
            {{event.time}}
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import EventViewById from '@/views/events/EventViewById.vue';

export default {
  name: 'NewEventCard',
  components: { EventViewById },
  data() {
    return {
      isModalActive: false,
      viewRoute: `/event/${this.event.id}`,
    };
  },
  props: {
    event: {
      id: String,
      title: String,
      price: String,
      city: String,
      country: String,
      time: String,
      imgUrl: String,
      description: String,
      category: String,
      tags: [String],
    },
  },
  watch: {
    event() {
      this.viewRoute = `/event/${this.event.id}`;
    },
  },
  methods: {
    moveToView() {
      this.isModalActive = true;
    },
  },
};
</script>

<style scoped>
.desktop-image {
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1),
  rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,.2), rgba(0,0,0,0));
  object-fit: cover;
}
.modal-card {
  border-radius: 7px;
}
</style>
