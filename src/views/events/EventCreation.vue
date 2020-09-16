<template>
  <div class="container">
    <div id="center-column" style="text-align: left;">
      <h2 class="title is-2">Register a new event</h2>
      <div class="columns" >
        <div class="column is-half">
          <b-field label="Name">
            <b-input v-model="name"></b-input>
          </b-field>

          <b-field label="Description">
            <b-input v-model="description" type="textarea"></b-input>
          </b-field>

          <b-field label="City">
            <b-autocomplete
              @select="option => selectedCity = option"
              placeholder="e.g. Paris, France"
              :data="suggestions"
              field="name"
              @typing="getApiResults">
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
            ></b-input>
          </b-field>

        </div>

        <div class="column is-half">

          <b-field label="Duration">
            <b-clockpicker v-model="duration" :hour-format="'24'"></b-clockpicker>
          </b-field>
          <br/>
          <h6 class="title is-6">Upload an image</h6>
          <b-field class="file is-primary" :class="{'has-name': !!file}">
            <b-upload v-model="file" class="file-label" accept="image/*">
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
    </div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';

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
    };
  },
  async mounted() {
    const apiKey = 'YOUR_API_KEY'; // TODO: Use real apikey from .env
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
          });
        });
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
