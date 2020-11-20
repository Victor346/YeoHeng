<template>
  <div>
    <div class="has-text-left">
      <h1 class="title is-2" id="main-title">User Management</h1>
    </div>
    <b-field class="has-text-left" label="Search" id="userSearchBar">
      <b-input
        v-model="userStr"
        placeholder="Search by username"></b-input>
    </b-field>
    <div id="usersTable" class="has-text-left">
      <b-table :data="userTableData">
        <b-table-column field="_id" label="ID" v-slot="props" width="25%">
          {{ props.row._id }}
        </b-table-column>
        <b-table-column field="name" label="Name" v-slot="props" width="20%">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="username" label="Username" v-slot="props" width="20%">
          {{ props.row.username }}
        </b-table-column>
        <b-table-column field="role" label="Role" v-slot="props" width="15%">
          <span class="tag is-primary" v-if="props.row.role === 'user'">
            User
          </span>
            <span class="tag is-success" v-if="props.row.role === 'admin'">
            Admin
          </span>
            <span class="tag is-warning" v-if="props.row.role === 'superadmin'">
            Super Admin
          </span>
        </b-table-column>
        <b-table-column field="email" label="Email" v-slot="props"  width="20%">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column label="" v-slot="props" :promoteUser="promoteUser" width="10%">
          <b-button type="is-danger" v-if="props.row.role === 'admin'"
                    @click="demoteUser(props.row._id)">Demote</b-button>
          <b-button type="is-success"
                    v-if="props.row.role === 'user'"
                    @click="promoteUser(props.row._id)">Promote</b-button>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserManagement',
  data() {
    return {
      userStr: '',
      tableLoading: false,
      userTableData: [],
    };
  },
  watch: {
    userStr() {
      this.retrieveUsers();
    },
  },
  methods: {
    retrieveUsers() {
      if (this.userStr === '') {
        this.userTableData = [];
        return;
      }
      this.tableLoading = true;
      axios.get(`${process.env.VUE_APP_BACKEND_URL}/users/${this.userStr}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.login.token}`,
        },
      }).then((response) => {
        this.userTableData = [];
        response.data.forEach((user) => {
          this.userTableData.push({
            email: user.email,
            name: user.name,
            role: user.role,
            username: user.username,
            // eslint-disable-next-line no-underscore-dangle
            _id: user._id.$oid,
          });
        });
        this.tableLoading = false;
      });
    },
    promoteUser(userId) {
      axios.put(`${process.env.VUE_APP_BACKEND_URL}/user/promote/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${this.$store.state.login.token}`,
        },
      }).then(() => {
        this.retrieveUsers();
      }).catch(() => {
        this.$buefy.snackbar.open({
          message: 'Error promoting user',
          type: 'is-danger',
          position: 'is-top',
          actionText: 'Retry',
          duration: 5000,
          onAction: () => {
            this.promoteUser(userId);
          },
        });
      });
    },
    demoteUser(userId) {
      axios.put(`${process.env.VUE_APP_BACKEND_URL}/user/demote/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${this.$store.state.login.token}`,
        },
      }).then(() => {
        this.retrieveUsers();
      }).catch(() => {
        this.$buefy.snackbar.open({
          message: 'Error demoting user',
          type: 'is-danger',
          position: 'is-top',
          actionText: 'Retry',
          duration: 5000,
          onAction: () => {
            this.promoteUser(userId);
          },
        });
      });
    },
  },
};
</script>

<style scoped>
#main-title {
  margin-left: 5%;
}
#usersTable {
  margin: 2% 5% 2% 5%;
}
#userSearchBar {
  margin-left: 5%;
  margin-top: 1%;
  max-width: 250px;
}
</style>
