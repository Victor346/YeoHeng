<template>
  <div>
    <NavBar />
    <section class="mt-2 mb-6">
      <div class="container columns mx-4">
        <div class="column is-half">
          <h1 class="title">Local</h1>
          <h2 class="subtitle">
            Register locally in <strong>YeoHeng</strong>.
          </h2>
          <SignUpForm />
        </div>
        <div class="column">
          <h1 class="title">Social Network</h1>
          <h2 class="subtitle">
            TODO: Social network register / log in.
          </h2>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import SignUpForm from '@/components/signup/SignUpForm.vue';
import NavBar from '@/components/layout/NavBar.vue';
import Footer from '@/components/layout/Footer.vue';

export default {
  name: 'SignUp',
  components: {
    SignUpForm,
    NavBar,
    Footer,
  },
  data() {
    return {
      email: '',
    };
  },
};
</script>
