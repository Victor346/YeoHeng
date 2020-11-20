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
        <div class="column is-2 is-offset-5">
          <div id="google-signin-btn" style="width: max-content;margin: auto;"></div>
        </div>
      </div>
    </section>
  </section>

</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue';
import { LOGIN_SUCCESS } from '@/store/mutations/types';
import axios from 'axios';

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
      const authResponse = googleUser.getAuthResponse();

      const data = {
        email: profile.getEmail(),
        name: profile.getName(),
        token_id: authResponse.id_token,
      };
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/login/google`, data)
        .then((response) => {
          this.$store.commit(LOGIN_SUCCESS, {
            username: response.data.username,
            token: response.data.jwt,
            id: response.data.id,
            provider: 'Google',
          });
          this.$router.push('/events');
        })
        .catch((error) => {
          // eslint-disable-next-line no-undef
          const auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(() => {
            console.log('User signed out.');
          });
          this.$buefy.toast.open({
            message: 'Error authenticating with google',
            type: 'is-danger',
          });
          console.log('error: ', error);
        });
    },
  },
};
</script>

<style scoped>

</style>
