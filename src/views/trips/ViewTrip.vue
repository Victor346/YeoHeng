<template>
  <div>
    <div class="has-text-left">
      <h1 class="title is-2" id="main-title">My Trips</h1>
    </div>
    <div class="has-text-left" style="margin-top: 25px; margin-left: 5%;">
      <b-button type="is-success" @click="isComponentModalActive = true">
        Register a new trip
      </b-button>
      <b-modal v-model="isComponentModalActive">
        <form action="" >
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
                      v-model="startDate">
                    </b-datepicker>
                  </b-field>

                  <b-field label="End Date">
                    <b-datepicker
                      placeholder="Click to select..."
                      v-model="endDate">
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
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="$emit('close')">Close</button>
              <button class="button is-primary">Register</button>
            </footer>
          </div>
        </form>
      </b-modal>
    </div>
    <b-tabs size="is-medium" type="is-boxed" class="block" id="tab-container">
      <b-tab-item label="My Trips" icon="google-photos" class="tab-content">
        <TripCardScroller type="PERSONAL"></TripCardScroller>
      </b-tab-item>
      <b-tab-item label="All Trips" icon="google-photos">
        <TripCardScroller type="ALL"></TripCardScroller>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import TripCardScroller from '@/components/trip/TripCardScroller.vue';
import GoogleMapsApiLoader from 'google-maps-api-loader';

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
      price: null,
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
