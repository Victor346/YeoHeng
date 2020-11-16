<template>
  <section>
    <section>
      <h1 class="title">YeoHeng 여행</h1>
      <img
        alt="logo"
        src="@/assets/yeoheng_logo.png"
        width="48"
      />
    </section>
    <section class="section">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <LoginForm />
        </div>
      </div>
    </section>
    <section>
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <h1 class="subtitle">
            TODO: Network Login
          </h1>
          <div id="google-signin-btn"></div>

        </div>
      </div>
    </section>
  </section>

</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue';

export default {
  name: 'LogIn',
  components: {
    LoginForm,
  },
  mounted() {
    // eslint-disable-next-line no-undef
    gapi.signin2.render('google-signin-btn', { // this is the button "id"
      onsuccess: this.onSignIn, // note, no "()" here
    });
  },
  methods: {
    onSignIn(googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log(`ID: ${profile.getId()}`); // Do not send to your backend! Use an ID token instead.
      console.log(`Name: ${profile.getName()}`);
      console.log(`Image URL: ${profile.getImageUrl()}`);
      console.log(`Email: ${profile.getEmail()}`); // This is null if the 'email' scope is not present.
    },
  },
};
</script>

<style scoped>

</style>
