<template>
  <v-container grid-list-md>
    <v-layout row wrap align-left justify-left fill-height>
      <v-flex xs12 sm8 lg7 md5>
         <v-layout column align-center>
       <v-flex xs6 sm8 md7>

         <v-alert v-if="showMsg === 'error'"
                dismissible
        :value="true"
        type="error"
      >
            Please verify Product information.
      </v-alert>
       </v-flex>
         </v-layout>
        <v-card class="login-card">
          <v-card-title>
            <span class="headline">{{pageTitle}}</span>
          </v-card-title>

          <v-spacer/>

          <v-card-text>


            <v-form ref="form" lazy-validation>
              <v-container>

                <v-text-field
                  v-model="product.cust_name"
                  label="Customer"
                  required
                  type="string"
                />
                <v-text-field
                  v-model="product.product"
                  label="Product"
                  required
                />
                <v-text-field
                  v-model="product.p_description"
                  label="Product Description"
                  required
                />
                <v-text-field
                  v-model="product.quantity"
                  label="Quantity"
                  required
                  type="number"
                />
                <v-text-field
                  v-model="product.pickup_time"
                  label="Pickup Time (YYYY-MM-DD HH:MM)"
                  required
                  type="datetime"
                />
                <v-text-field
                  v-model="product.charge"
                  label="Charge"
                  required
                  type="number"
                />
              </v-container>
              <v-btn v-if="!isUpdate" class="blue white--text" @click="createProduct">Save</v-btn>
              <v-btn v-if="isUpdate" class="blue white--text" @click="updateProduct">Update</v-btn>
              <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>


            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: 'productCreate',
    components: {},
    data() {
      return {
        showError: false,
        product: {},
        pageTitle: "Add New product",
        isUpdate: false,
        showMsg: '',
      };
    },
    methods: {
      createProduct() {
        apiService.addNewProduct(this.product).then(response => {
          if (response.status === 201) {
            this.product = response.data;
             this.showMsg = "";
            router.push('/product-list/new');
          }else{
              this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      },
      cancelOperation(){
         router.push("/product-list");
      },
      updateProduct() {
        apiService.updateProduct(this.product).then(response => {
          if (response.status === 200) {
            this.product = response.data;
            router.push('/product-list/update');
          }else{
              this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      }
    },
    mounted() {
      if (this.$route.params.pk) {
        this.pageTitle = "Edit product";
        this.isUpdate = true;
        apiService.getProduct(this.$route.params.pk).then(response => {
          this.product = response.data;
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
      }
    },
  }
</script>
<style scoped>
  .aform {
    margin-left: auto;
    width: 60%;
  }
</style>
