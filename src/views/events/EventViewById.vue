<template>
  <div>
    <section class="intro has-text-left">
      <h1 class="title is-2">{{name}}</h1>
    </section>
    <div class="hero is-light is-bold mx-6 my-2"
      style="background-image: none;background-color: white;">
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
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv');

export default {
  name: 'EventViewById',
  props: {
    idProp: String,
  },
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
    };
  },
  mounted() {
    let { id } = this.$router.currentRoute.params;
    console.log('id prop', this.idProp);
    if (this.idProp !== undefined) {
      id = this.idProp;
    }
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/event/${id}`)
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
        console.log(JSON.stringify(response.data));
      });
  },
};
</script>

<style scoped>
section {
  padding: 2%;
}
</style>
