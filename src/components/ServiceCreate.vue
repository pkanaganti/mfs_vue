<template>
  <v-container grid-list-md>
    <v-layout row wrap align-left justify-left fill-height>
      <v-flex xs12 sm8 lg7 md5>
        <v-layout column align-center>
          <v-flex xs6 sm8 md7>
            <v-alert
              v-if="showMsg === 'error'"
              dismissible
              :value="true"
              type="error"
            >Please verify Service information.</v-alert>
          </v-flex>
        </v-layout>
        <v-card class="login-card">
          <v-card-title>
            <span class="headline">{{pageTitle}}</span>
          </v-card-title>

          <v-spacer />

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-container>
                <v-text-field
                  v-model="service.cust_name"
                  label="Customer"
                  required
                  type="string"
                />

                <v-text-field v-model="service.service_category" label="Category" required />
                <v-text-field v-model="service.description" label="Description" required />
                <v-text-field v-model="service.location" label="Location" required />
                <v-text-field
                  v-model="service.setup_time"
                  label="Setup Time (YYYY-MM-DD HH:MM)"
                  required
                  type="datetime"
                />
                <v-text-field
                  v-model="service.cleanup_time"
                  label="Cleanup Time (YYYY-MM-DD HH:MM)"
                  required
                  type="datetime"
                />
                <v-text-field
                  v-model="service.service_charge"
                  label="Service Charge"
                  required
                  type="number"
                />
              </v-container>
              <v-btn v-if="!isUpdate" class="blue white--text" @click="createService">Save</v-btn>
              <v-btn v-if="isUpdate" class="blue white--text" @click="updateService">Update</v-btn>
              <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import router from "../router";
import { APIService } from "../http/APIService";
const apiService = new APIService();

export default {
  name: "ServiceCreate",
  components: {},
  data() {
    return {
      showError: false,
      service: {},
      pageTitle: "Add New Service",
      isUpdate: false,
      showMsg: ""
    };
  },
  methods: {
    createService() {
      apiService
        .addNewService(this.service)
        .then(response => {
          if (response.status === 201) {
            this.service = response.data;
            this.showMsg = "";
            router.push("/service-list/new");
          } else {
            this.showMsg = "error";
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          } else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
    },
    cancelOperation() {
      router.push("/service-list");
    },
    updateService() {
      apiService
        .updateService(this.service)
        .then(response => {
          if (response.status === 200) {
            this.service = response.data;
            router.push("/service-list/update");
          } else {
            this.showMsg = "error";
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          } else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
    }
  },
  mounted() {
    if (this.$route.params.pk) {
      this.pageTitle = "Edit Service";
      this.isUpdate = true;
      apiService
        .getService(this.$route.params.pk)
        .then(response => {
          this.service = response.data;
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
    }
  }
};
</script>
<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
</style>
