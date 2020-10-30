<template>
  <form>
    <div class="columns">
      <div class="column">
        <b-field label="Name">
          <b-input
            v-model="name"
            required
          />
        </b-field>
        <div class="columns">
          <div class="column">
            <b-field label="Start Date">
              <b-datepicker
                placeholder="Click to select..."
                v-model="startDate"
                :min-date="minDate"
                :max-date="maxDate">
              </b-datepicker>
            </b-field>
          </div>
          <div class="column">
            <b-field label="End Date">
              <b-datepicker
                placeholder="Click to select..."
                v-model="endDate"
                :min-date="startDate"
                :max-date="maxDate">
              </b-datepicker>
            </b-field>
          </div>
        </div>
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
      <div class="column">
        <b-field label="City">
          <h1>TODO: API input</h1>
        </b-field>
        <b-field label="Is your trip private?">
            <b-switch v-model="isPrivate">
            </b-switch>
        </b-field>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'TripForm',
  data() {
    const currentDate = new Date();
    const endDate = new Date();
    const minDate = new Date();
    const maxDate = new Date();
    endDate.setDate(currentDate.getDate() + 7);
    minDate.setFullYear(minDate.getFullYear() - 1);
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    return {
      name: null,
      startDate: currentDate,
      endDate,
      minDate,
      maxDate,
      price: 0,
      isPrivate: false,
    };
  },
  watch: {
    name() { this.$emit('set-name', this.name); },
    startDate() {
      this.$emit('set-start-date', this.startDate);
    },
    endDate() { this.$emit('set-end-date', this.endDate); },
  },
};
</script>

<style>
.dropdown-menu {
  z-index: 30 !important;
}
</style>
