<template>
  <div class="container">
    <div id="center-column" style="text-align: left;">
      <h2 class="title is-2">Register a new event</h2>
      <form @submit.prevent="handleSubmit">
        <div class="columns">

          <div class="column is-half">
            <b-field label="Name">
              <b-input v-model="name" required></b-input>
            </b-field>

            <b-field label="Description">
              <b-input v-model="description" type="textarea" required></b-input>
            </b-field>

            <b-field label="City">
              <b-autocomplete
                @select="option => selectedCity = option"
                placeholder="e.g. Paris, France"
                :data="suggestions"
                field="name"
                @typing="getApiResults" required>
                <template slot-scope="props">
                  <div>
                    {{ props.option.name }}
                  </div>
                </template>
              </b-autocomplete>
            </b-field>

            <b-field label="Price">
              <b-input
                v-model="price"
                placeholder="00.00"
                icon="currency-usd"
                required
              ></b-input>
            </b-field>

          </div>

          <div class="column is-half">

            <b-field label="Duration">
              <b-clockpicker v-model="duration" :hour-format="'24'" required></b-clockpicker>
            </b-field>
            <b-field label="Category">
              <b-select v-model="category" placeholder="Select a category" required>
                <option
                  v-for="option in categories"
                  :value="option.id"
                  :key="option.id"
                >
                  {{ option.name }}
                </option>
              </b-select>
            </b-field>

            <b-field label="Tags">
              <b-taginput
                v-model="tags"
                type="is-danger">
              </b-taginput>
            </b-field>

            <br/>
            <h6 class="title is-6">Upload an image</h6>
            <b-field class="file is-primary" :class="{'has-name': !!file}">
              <b-upload v-model="file" class="file-label" accept="image/*" required>
            <span class="file-cta">
                <b-icon class="file-icon" icon="upload"></b-icon>
                <span class="file-label">Click to upload</span>
            </span>
                <span class="file-name" v-if="file">
                {{ file.name }}
            </span>
              </b-upload>
            </b-field>

          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-one-fifth">
            <button
              class="button is-success is-medium"
              type="submit"
              expanded>Register event
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

export default {
  name: 'EventCreation',
  data() {
    return {
      selectedCity: null,
      name: '',
      description: '',
      suggestions: [],
      google: null,
      file: null,
      price: null,
      duration: null,
      category: null,
      tags: null,
      categories: [
        {
          name: 'Culture',
          id: 1,
        },
        {
          name: 'Sports',
          id: 2,
        },
      ],
    };
  },
  async mounted() {
    const apiKey = ''; // TODO: Use real apikey from .env
    const googleMapApi = await GoogleMapsApiLoader({
      libraries: ['places'],
      apiKey,
    });
    this.google = googleMapApi;
  },
  methods: {
    getApiResults(input) {
      const request = {
        input,
        types: ['(cities)'],
      };
      const service = new this.google.maps.places.AutocompleteService();
      service.getPlacePredictions(request, (predictions, status) => {
        console.log(predictions);
        console.log(status);
        this.suggestions = [];
        predictions.forEach((prediction) => {
          this.suggestions.push({
            name: prediction.description,
            placeId: prediction.place_id,
            city: prediction.terms[0].value,
            country: prediction.terms[prediction.terms.length - 1].value,
          });
        });
      });
    },
    handleSubmit() {
      console.log('jola');
      const params = {
        name: this.name,
        description: this.description,
        personal_type: this.category,
        country: this.country,
        city: this.city,
      };
      const splittedFileName = this.file.name.split('.');
      const presignedParams = {
        file_extension: splittedFileName[splittedFileName.length - 1],
        username: 'Vc346',
      };
      console.log(params);
      console.log(presignedParams);
      axios({
        url: '',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(presignedParams),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
@media (max-width: 900px) {
  #center-column {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
