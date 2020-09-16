<template>

  <section>
    <h1 class="title">Register to YeoHeng</h1>

    <div class="columns mx-4">
      <div class="column is-offset-1 is-4">
        <SignUpForm />
      </div>
      <div class="column is-offset-2 is-4">
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
