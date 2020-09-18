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
                  :value="option.name"
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
      tags: [],
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
    const apiKey = ''; // TODO: Use real google apikey from .env
    const googleMapApi = await GoogleMapsApiLoader({
      libraries: ['places'],
      apiKey,
    });
    this.google = googleMapApi;
  },
  methods: {
    success_snackbar() {
      this.$buefy.snackbar.open({
        message: 'Your event has been registered successfully',
        position: 'is-top',
      });
    },
    error_snackbar() {
      this.$buefy.snackbar.open({
        duration: 10000,
        message: 'An error has ocurred while registering your event',
        type: 'is-danger',
        position: 'is-top',
        actionText: 'Retry',
        onAction: () => this.handleSubmit(),
      });
    },
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
      const splittedFileName = this.file.name.split('.');
      const presignedParams = new URLSearchParams();
      presignedParams.append('file_extension', splittedFileName[splittedFileName.length - 1]);
      presignedParams.append('username', ''); // TODO: Get username from store

      axios.get('http://localhost:3000/event/presigned', { params: presignedParams })
        .then((response) => {
          const presignedUrl = response.data.presigned_url;
          const publicUrl = response.data.public_url;
          console.log(publicUrl);
          const options = {
            headers: {
              'Content-Type': this.file.type,
            },
          };
          axios.put(presignedUrl, this.file, options)
            .then((result) => {
              const params = {
                name: this.name,
                description: this.description,
                personal_type: this.category,
                country: this.selectedCity.country,
                city: this.selectedCity.city,
                image: publicUrl,
                tags: this.tags,
                user_id: '', // TODO: place user_id from store
              };
              console.log(JSON.stringify(params));
              const config = {
                method: 'post',
                url: 'http://localhost:3000/protected',
                headers: {
                  Authorization: 'Bearer ', // TODO: place token from store
                  'Content-Type': 'application/json',
                },
                data: JSON.stringify(params),
              };

              axios(config)
                .then((res) => {
                  this.success_snackbar();
                  console.log(res);
                })
                .catch(() => {
                  this.error_snackbar();
                });

              console.log(result);
            })
            .catch(() => {
              this.error_snackbar();
            });
        })
        .catch(() => {
          this.error_snackbar();
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
