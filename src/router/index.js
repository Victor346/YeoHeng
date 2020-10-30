import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store/index';
import Home from '@/views/Home.vue';
import SignUp from '@/views/SignUp.vue';
import LogIn from '@/views/LogIn.vue';
import EventCreation from '@/views/events/EventCreation.vue';
import ViewEvent from '@/views/events/ViewEvent.vue';
import TripEdition from '@/views/trips/TripEdition.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'Login',
    component: LogIn,
  },
  {
    path: '/event/new',
    name: 'New Event',
    component: EventCreation,
    meta: { requiresAuthentication: true },
  },
  {
    path: '/events',
    name: 'Events',
    component: ViewEvent,
  },
  {
    path: '/trip/edit',
    name: 'Edit Trip',
    component: TripEdition,
    meta: { requiresAuthentication: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuthentication)) {
    if (store.state.login.username !== null && store.state.login.token !== null) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
