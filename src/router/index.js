import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store/index';
import Home from '@/views/Home.vue';
import SignUp from '@/views/SignUp.vue';
import LogIn from '@/views/LogIn.vue';
import EventCreation from '@/views/events/EventCreation.vue';
import ViewEvent from '@/views/events/ViewEvent.vue';
import ViewTrip from '@/views/trips/ViewTrip.vue';
import TripEdition from '@/views/trips/TripEdition.vue';
import UserManagement from '@/views/UserManagement.vue';
import EventEdition from '@/views/events/EventEdition.vue';
import EventViewById from '@/views/events/EventViewById.vue';
import TripDetails from '@/components/trip/TripDetails.vue';

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
    path: '/event/:id',
    name: 'View Event',
    component: EventViewById,
  },
  {
    path: '/event/edit/:id',
    name: 'Edit Event',
    component: EventEdition,
    meta: { requiresAuthentication: true },
  },
  {
    path: '/events',
    name: 'Events',
    component: ViewEvent,
  },
  {
    path: '/trips',
    name: 'Trips',
    component: ViewTrip,
  },
  {
    path: '/trip/:id',
    name: 'Trip Details',
    component: TripDetails,
  },
  {
    path: '/trip/edit/:id',
    name: 'Edit Trip',
    component: TripEdition,
    meta: { requiresAuthentication: true },
  },
  {
    path: '/user/management',
    name: 'User Management',
    component: UserManagement,
    meta: { requiresSuperAdmin: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresSuperAdmin)) {
    if (store.state.login.token !== null && store.state.login.role === 'superadmin') {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else if (to.matched.some((record) => record.meta.requiresAuthentication)) {
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
