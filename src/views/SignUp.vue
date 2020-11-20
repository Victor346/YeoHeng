<template>

  <section>
    <h1 class="title">Register to YeoHeng</h1>

    <div class="columns mx-4">
      <div class="column is-offset-1 is-4">
        <SignUpForm />
      </div>
      <div class="column is-offset-2 is-4">
        <h1 class="title">Or register using Google</h1>
        <div id="google-signin-btn" style="width: max-content;margin: auto;"></div>
      </div>
    </div>

  </section>

</template>

<script>
import SignUpForm from '@/components/signup/SignUpForm.vue';
import axios from 'axios';
import { LOGIN_SUCCESS } from '@/store/mutations/types';

export default {
  name: 'SignUp',
  components: {
    SignUpForm,
  },
  mounted() {
    // eslint-disable-next-line no-undef
    gapi.signin2.render('google-signin-btn', { // this is the button "id"
      onsuccess: this.onSignIn, // note, no "()" here
    });
  },
  data() {
    return {
      email: '',
    };
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
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/signup/google`, data)
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
            message: 'Error registering with Google, Make sure you dont have an account already',
            type: 'is-danger',
          });
          console.log('error: ', error);
        });
    },
  },
};
</script>
