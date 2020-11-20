<template>
  <div>
    <section class="intro has-text-left">
      <div class="columns is-vcentered mx-4">
        <div class="column is-8">
          <span class="title is-2">{{name}}</span>
        </div>
        <div class="column has-text-right" v-if="!this.isPrivate">
          <ForcePrivateButton
            v-if="this.$store.state.login.role === 'superadmin'"
            :id="this.$router.currentRoute.params.id"
          />
        </div>
        <div class="column has-text-right" v-else>
          <h1 class="title is-4">Private Event</h1>
        </div>
      </div>

    </section>
    <div class="hero is-light is-bold mx-6 my-2">
      <div class="columns is-vcentered my-2 mx-4">
        <div class="column is-9 px-6">
          <h1 class="title is-3 has-text-left">
            {{city}}, {{country}}
          </h1>
            <h1 class="subtitle is-4 has-text-left">
            {{description}}
          </h1>
          <h1 class="subtitle is-4 has-text-left">
            Duration: {{duration}}
          </h1>
          <div class="has-text-left my-4">
            <b-tag type="is-success" size="is-large">
              {{type}}
            </b-tag>
            <span class="subtitle is-4 has-text-left mx-4">
              Price: <b>${{price}}</b>
            </span>
          </div>
          <div class="subtitle is-4 has-text-left">
            <b-tag v-for="tag in tags"
                   :key="tags.indexOf(tag)"
                   size="is-large"
                   type="is-primary"
            >
              {{tag}}
            </b-tag>
          </div>
        </div>
        <div class="column">
          <img :src="this.image" alt="logo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ForcePrivateButton from '@/components/events/ForcePrivateButton.vue';
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv');

export default {
  name: 'EventViewById',
  components: { ForcePrivateButton },
  data() {
    return {
      name: '',
      city: '',
      country: '',
      description: '',
      image: '',
      type: '',
      duration: '',
      price: 0,
      tags: [],
      isPrivate: false,
    };
  },
  mounted() {
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/event/${this.$router.currentRoute.params.id}`)
      .then((response) => {
        this.name = response.data.name;
        this.city = response.data.city;
        this.country = response.data.country;
        this.description = response.data.description;
        this.image = response.data.image;
        this.type = response.data.personal_type;
        this.duration = response.data.duration;
        this.price = response.data.price;
        this.tags = response.data.tags;
        this.isPrivate = response.data.private;
      });
  },
};
</script>

<style scoped>
section {
  padding: 2%;
}
</style>
