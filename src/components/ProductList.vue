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
        New product has been added.
      </v-alert>
      <v-alert v-if="showMsg === 'update'" dismissible
        :value="true"
        type="success"
      >
        Product information has been updated.
      </v-alert>
         <v-alert v-if="showMsg === 'deleted'" dismissible
        :value="true"
        type="success"
      >
        Selected product has been deleted.
      </v-alert>

       </v-flex>
       </v-layout>
      <br/>
      <v-container fluid grid-list-md fill-height>
      <v-layout column>
        <v-flex md6>
      <v-data-table
        :headers="headers"
        :items="products"
        hide-actions
        class="elevation-1"
        fixed
        style="max-height: 300px; overflow-y: auto"
      >

        <template slot="items" slot-scope="props" >
          <td>{{ props.item.cust_name}}</td>
          <td nowrap="true">{{ props.item.product }}</td>
          <td nowrap="true">{{ props.item.p_description }}</td>
          <td nowrap="true">{{ props.item.quantity }}</td>
          <td nowrap="true">{{ props.item.pickup_time }}</td>
          <td nowrap="true">{{ props.item.charge }}</td>
          <td nowrap="true">
            <v-icon @click="updateProduct(props.item)">edit</v-icon>
          </td>
          <td nowrap="true">
            <v-icon @click="deleteProduct(props.item)">delete</v-icon>
          </td>

        </template>

      </v-data-table>
        </v-flex>
      </v-layout>
      </v-container>

      <v-btn class="blue white--text" @click="addNewProduct">Add product</v-btn>
    </v-container>

  </main>
</template>


<script>

  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: "productList",
    data: () => ({
      products: [],
      validUserName: "Guest",
      productSize: 0,
      showMsg: '',
      headers: [
        
        {text: 'Customer', sortable: false, align: 'left',},
        {text: 'Product', sortable: false, align: 'left',},
        {text: 'Product Description', sortable: false, align: 'left',},
        {text: 'Quantity', sortable: false, align: 'left',},
        {text: 'Pickup Time', sortable: false, align: 'left',},
        {text: 'Charge', sortable: false, align: 'left',},
        {text: 'Update', sortable: false, align: 'left',},
        {text: 'Delete', sortable: false, align: 'left',}

      ],

    }),
    mounted() {
      this.getProducts();
      this.showMessages();
    },
    methods: {
      showMessages(){
        console.log(this.$route.params.msg)
         if (this.$route.params.msg) {
           this.showMsg = this.$route.params.msg;
         }
      },
      getProducts() {
        apiService.getProductList().then(response => {
          this.products = response.data.data;
          this.productSize = this.products.length;
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
      addNewProduct() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/product-create');
        } else {
          router.push("/auth");
        }
      },
      updateProduct(product) {
        router.push('/product-create/' + product.pk);
      },
      deleteProduct(product) {
        apiService.deleteProduct(product.pk).then(response => {
          if (response.status === 204) {
            alert("product deleted");
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
