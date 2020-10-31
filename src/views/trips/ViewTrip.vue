<template>
  <div>
    <div class="has-text-left">
      <h1 class="title is-2" id="main-title">Trips</h1>
    </div>
    <div v-if="this.$store.state.login.token != null"
         class="has-text-left"
         style="margin-top: 25px; margin-left: 5%;">
      <b-button type="is-success" @click="isComponentModalActive = true">
        Register a new trip
      </b-button>
      <b-modal v-model="isComponentModalActive">
        <form @submit.prevent="handleRegister" >
          <div class="modal-card" style="width: auto; height: 90%;">
            <header class="modal-card-head">
              <p class="modal-card-title">Register new trip</p>
            </header>
            <section class="modal-card-body" style="min-height: 90%;">
              <div class="columns">
                <div class="column">
                  <b-field label="Name">
                    <b-input
                      type="text"
                      v-model="name"
                      placeholder="The name for your trip"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Start Date">
                    <b-datepicker
                      placeholder="Click to select..."
                      v-model="startDate"
                      style="z-index: 100;"
                      required>
                    </b-datepicker>
                  </b-field>

                  <b-field label="End Date">
                    <b-datepicker
                      placeholder="Click to select..."
                      v-model="endDate"
                      style="z-index: 99;"
                      required>
                    </b-datepicker>
                  </b-field>
                </div>
                <div class="column">
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
                  <b-switch v-model="isPrivate" style="margin-top: 5px;">
                    Make this trip private
                  </b-switch>
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-primary" type="submit">Register</button>
            </footer>
          </div>
        </form>
      </b-modal>
    </div>
    <b-tabs size="is-medium" type="is-boxed" class="block" id="tab-container">
      <b-tab-item label="My Trips"
                  icon="google-photos"
                  class="tab-content"
                  v-if="this.$store.state.login.token != null">
        <TripCardScroller :trigger="trigger" type="PERSONAL"></TripCardScroller>
      </b-tab-item>
      <b-tab-item label="All Trips" icon="google-photos">
        <TripCardScroller :trigger="trigger" type="ALL"></TripCardScroller>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import TripCardScroller from '@/components/trip/TripCardScroller.vue';
import GoogleMapsApiLoader from 'google-maps-api-loader';
import axios from 'axios';

export default {
  name: 'ViewTrip',
  components: {
    TripCardScroller,
  },
  data() {
    return {
      isComponentModalActive: false,
      name: '',
      google: null,
      selectedCity: null,
      suggestions: [],
      startDate: null,
      endDate: null,
      isPrivate: false,
      trigger: 0,
    };
  },
  async mounted() {
    const apiKey = process.env.VUE_APP_GOOGLE_API_KEY;
    const googleMapApi = await GoogleMapsApiLoader({
      libraries: ['places'],
      apiKey,
    });
    this.google = googleMapApi;
  },
  methods: {
    success_snackbar() {
      this.$buefy.snackbar.open({
        message: 'Your trip has been registered successfully',
        position: 'is-top',
      });
    },
    error_snackbar() {
      this.$buefy.snackbar.open({
        duration: 10000,
        message: 'An error has ocurred while registering your trip',
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
    handleRegister() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.container,
      });
      const data = {
        name: this.name,
        start_date: new Date(this.startDate.setUTCHours(0, 0, 0, 0)).toISOString(),
        end_date: new Date(this.endDate.setUTCHours(0, 0, 0, 0)).toISOString(),
        budget: 0,
        destination: `${this.selectedCity.city}, ${this.selectedCity.country}`,
        private: this.isPrivate,
        user_id: this.$store.state.login.id,
      };

      const config = {
        method: 'post',
        url: `${process.env.VUE_APP_BACKEND_URL}/trip`,
        headers: {
          Authorization: `Bearer ${this.$store.state.login.token}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };

      axios(config)
        .then(() => {
          this.isComponentModalActive = false;
          loadingComponent.close();
          this.trigger = Math.random();
          this.success_snackbar();
        })
        .catch(() => {
          this.isComponentModalActive = false;
          loadingComponent.close();
          this.error_snackbar();
        });
    },
  },
};
</script>

<style scoped>
  #main-title {
    margin-left: 5%;
  }
  #tab-container {
    margin-left: 5%;
    margin-top: 25px;
    margin-right: 5%;
    background-color: white;
  }
  section .tab-content {
    padding: 0 ;
  }
  .cardContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-between;
  }
</style>
