<template>
  <div class="container">
    <div id="center-column" style="text-align: left;">
        <h2 class="title is-2">Edit your event to {{ this.previousCity }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="columns">

          <div class="column is-half">
            <b-field label="Name">
              <b-input v-model="name" required></b-input>
            </b-field>

            <b-field label="Description">
              <b-input v-model="description" type="textarea" required></b-input>
            </b-field>

            <b-field label="Price (USD)">
              <b-input
                v-model="price"
                placeholder="00.00"
                icon="currency-usd"
                type="number"
                min="0"
                step=".01"
                required
              ></b-input>
            </b-field>

          </div>

          <div class="column is-half">

            <b-field label="Duration">
              <b-input
                v-model="hour"
                placeholder="Hours"
                type="number"
                min="0"
                max="24"
                default="0"
                required
              ></b-input>
              <h5 class="title is-5 is-vertical"
                  style="margin-top: 6px; margin-left: 2px; margin-right: 2px;">:</h5>
              <b-input
                v-model="minutes"
                placeholder="0"
                type="number"
                min="0"
                max="59"
                required
              ></b-input>
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
            <b-switch v-model="isPrivate" style="margin-top: 5px;">
              Make this event private
            </b-switch>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-one-fifth has-text-centered">
            <button
              class="button is-success is-medium"
              type="submit"
            >
              Edit event
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv');

export default {
  name: 'EventEdition',
  data() {
    return {
      previousCity: null,
      selectedCity: null,
      isPrivate: false,
      name: '',
      hour: 0,
      minutes: 0,
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
        {
          name: 'Food',
          id: 3,
        },
      ],
    };
  },
  async mounted() {
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/event/${this.$router.currentRoute.params.id}`)
      .then((response) => {
        this.name = response.data.name;
        this.description = response.data.description;
        this.tags = response.data.tags;
        this.category = response.data.personal_type;
        this.previousCity = `${response.data.city}, ${response.data.country}`;
        this.price = response.data.price;
        this.hour = parseInt(response.data.duration.split(' ')[0], 0);
        this.minutes = parseInt(response.data.duration.split(' ')[2], 0);
        this.isPrivate = response.data.private;
        // console.log(JSON.stringify(response.data));
      });
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
    handleSubmit() {
      if (this.file !== null) {
        const splittedFileName = this.file.name.split('.');
        const presignedParams = new URLSearchParams();
        presignedParams.append('file_extension', splittedFileName[splittedFileName.length - 1]);
        presignedParams.append('username', this.$store.state.login.username);

        axios.get(`${process.env.VUE_APP_BACKEND_URL}/event/presigned`, {
          params: presignedParams,
          headers: {
            Authorization: `Bearer ${this.$store.state.login.token}`,
          },
        })
          .then((response) => {
            const presignedUrl = response.data.presigned_url;
            const publicUrl = response.data.public_url;
            const options = {
              headers: {
                'Content-Type': this.file.type,
              },
            };

            axios.put(presignedUrl, this.file, options)
              .then(() => {
                const params = {
                  _id: this.$router.currentRoute.params.id,
                  name: this.name,
                  description: this.description,
                  tags: this.tags,
                  personal_type: this.category,
                  image: publicUrl,
                  private: this.isPrivate,
                  user_id: this.$store.state.login.id,
                  price: parseFloat(this.price),
                  duration: `${this.hour} hour(s) ${this.minutes} minute(s)`,
                };
                const config = {
                  method: 'put',
                  url: `${process.env.VUE_APP_BACKEND_URL}/event/update`,
                  headers: {
                    Authorization: `Bearer ${this.$store.state.login.token}`,
                    'Content-Type': 'application/json',
                  },
                  data: JSON.stringify(params),
                };

                axios(config)
                  .then(() => {
                    this.$router.push('/events');
                    this.success_snackbar();
                  })
                  .catch(() => {
                    this.error_snackbar();
                  });
              })
              .catch(() => {
                this.error_snackbar();
              });
          })
          .catch(() => {
            this.error_snackbar();
          });
      } else {
        const params = {
          _id: this.$router.currentRoute.params.id,
          name: this.name,
          description: this.description,
          personal_type: this.category,
          tags: this.tags,
          private: this.isPrivate,
          user_id: this.$store.state.login.id,
          price: parseFloat(this.price),
          duration: `${this.hour} hour(s) ${this.minutes} minute(s)`,
        };
        const config = {
          method: 'put',
          url: `${process.env.VUE_APP_BACKEND_URL}/event/update`,
          headers: {
            Authorization: `Bearer ${this.$store.state.login.token}`,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(params),
        };
        axios(config)
          .then(() => {
            this.$router.push('/events');
            this.success_snackbar();
          })
          .catch(() => {
            this.error_snackbar();
          });
      }
    },
  },
};
</script>

<style scoped>

</style>
