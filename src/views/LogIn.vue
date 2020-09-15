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
};
</script>

<style scoped>

</style>
