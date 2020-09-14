<template>
  <section>
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
</template>

<script>
import SignUpForm from '@/components/signup/SignUpForm.vue';

export default {
  name: 'SignUp',
  components: {
    SignUpForm,
  },
  data() {
    return {
      email: '',
    };
  },
};
</script>
