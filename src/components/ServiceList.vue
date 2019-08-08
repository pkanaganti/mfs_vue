<template>
  <main>
    <br/>
    <v-container fluid grid-list-md>
      <v-layout column align-left>
        <blockquote>
         Welcome {{validUserName}}!
          <footer>
            <small>
              <em>&mdash;Maverick Food services, Ingredients For Your Success!.</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>

       <v-layout column align-center>
       <v-flex xs6 sm8 md7>
       <v-alert v-if="showMsg === 'new'"
                dismissible
        :value="true"
        type="success"
      >
        New service has been added.
      </v-alert>
      <v-alert v-if="showMsg === 'update'" dismissible
        :value="true"
        type="success"
      >
        Service information has been updated.
      </v-alert>
         <v-alert v-if="showMsg === 'deleted'" dismissible
        :value="true"
        type="success"
      >
        Selected Service has been deleted.
      </v-alert>

       </v-flex>
       </v-layout>
      <br/>
      <v-container fluid grid-list-md fill-height>
      <v-layout column>
        <v-flex md6>
      <v-data-table
        :headers="headers"
        :items="services"
        hide-actions
        class="elevation-1"
        fixed
        style="max-height: 300px; overflow-y: auto"
      >

        <template slot="items" slot-scope="props" >
          <td>{{ props.item.cust_name }}</td>
          <td nowrap="true">{{ props.item.service_category }}</td>
          <td nowrap="true">{{ props.item.description }}</td>
          <td nowrap="true">{{ props.item.location }}</td>
          <td nowrap="true">{{ props.item.setup_time }}</td>
          <td nowrap="true">{{ props.item.cleanup_time }}</td>
          <td nowrap="true">{{ props.item.service_charge }}</td>
          <td nowrap="true">
            <v-icon @click="updateService(props.item)">edit</v-icon>
          </td>
          <td nowrap="true">
            <v-icon @click="deleteService(props.item)">delete</v-icon>
          </td>

        </template>

      </v-data-table>
        </v-flex>
      </v-layout>
      </v-container>

      <v-btn class="blue white--text" @click="addNewService">Add Service</v-btn>
    </v-container>

  </main>
</template>


<script>

  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: "ServiceList",
    data: () => ({
      services: [],
      validUserName: "Guest",
      serviceSize: 0,
      showMsg: '',
      headers: [
        
        {text: 'Customer', sortable: false, align: 'left',},
        {text: 'Category', sortable: false, align: 'left',},
        {text: 'Description', sortable: false, align: 'left',},
        {text: 'Location', sortable: false, align: 'left',},
        {text: 'Setup Time', sortable: false, align: 'left',},
        {text: 'Cleanup Time', sortable: false, align: 'left',},
        {text: 'Service Charge', sortable: false, align: 'left',},
        {text: 'Update', sortable: false, align: 'left',},
        {text: 'Delete', sortable: false, align: 'left',}

      ],

    }),
    mounted() {
      this.getServices();
      this.showMessages();
    },
    methods: {
      showMessages(){
        console.log(this.$route.params.msg)
         if (this.$route.params.msg) {
           this.showMsg = this.$route.params.msg;
         }
      },
      getServices() {
        apiService.getServiceList().then(response => {
          this.services = response.data.data;
          this.serviceSize = this.services.length;
          if (localStorage.getItem("isAuthenticates")
            && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      },
      addNewService() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/service-create');
        } else {
          router.push("/auth");
        }
      },
      updateService(service) {
        router.push('/service-create/' + service.pk);
      },
      deleteService(service) {
        apiService.deleteService(service.pk).then(response => {
          if (response.status === 204) {
            alert("Service deleted");
            this.showMsg = 'deleted';
            this.$router.go();
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      }
    }
  };
</script>
