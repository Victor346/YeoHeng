<template>
  <div>
    <div class="has-text-left">
      <h1 class="title is-2" id="main-title">User Management</h1>
    </div>
    <b-field class="has-text-left" label="Search" id="userSearchBar">
      <b-input v-model="userStr"></b-input>
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
        <b-table-column label="" v-slot="props" width="10%">
          <b-button type="is-danger" v-if="props.row.role === 'admin'">Demote</b-button>
          <b-button type="is-success" v-if="props.row.role === 'user'">Promote</b-button>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      userStr: '',
      userTableData: [
        {
          _id: 'dasdad', name: 'Victor', username: 'Vc346', role: 'admin', email: 'A01336434@itesm.mx',
        },
      ],
      columns: [
        {
          field: '_id',
          label: 'ID',
        },
        {
          field: 'name',
          label: 'Name',
        },
        {
          field: 'username',
          label: 'Username',
        },
        {
          field: 'role',
          label: 'Role',
        },
        {
          field: 'email',
          label: 'Email',
        },
      ],
    };
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
