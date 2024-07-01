<template>
  <section class="container">
    <h2 class="text-primary">Your Cart</h2>
    <h3>Total Amount: <base-badge mode="elegant">${{ cartTotal }}</base-badge></h3>
    <button type="button" class="btn btn-primary" @click="startPay">Buy</button>
    <ul>
      <cart-item
        v-for="item in cartItems"
        :key="item.productId"
        :prod-id="item.productId"
        :title="item.title"
        :image="item.image"
        :price="item.price"
        :qty="item.qty"
      ></cart-item>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import CartItem from '../components/cart/CartItem.vue';
import { useStore } from 'vuex';
import config from '../config'
import axios from 'axios';


const store = useStore()
var cartTotal = computed(() => store.getters['cart/totalSum'].toFixed(2));

var cartItems = computed(() => store.getters['cart/products']);

// Mini App front-end call up the cashier:
var price = 0;
cartItems.value.forEach(c => {
  price += c.price
});

console.log(price.toFixed(2));

axios.defaults.withCredentials = true;
function startPay() {
  if (!price) {
    return;
  }
  console.log('startPay');
  axios.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true}).then(() => {
    axios.post(config.baseUrl + '/create/order', 
      {
        amount: price,
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
      }
    )
    .then((res) => {
      console.log(res);
      //rawRequest is the signed parameter returned by the backend.
      window.ma
          .native('startPay', { rawRequest: res.data })
          .then((startPayRes) => {
            //After the payment is successful, the information is printed.
            console.log(startPayRes);
          });
    })
    .catch(e => console.error(e))
    .finally(() => {
    });
  });
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
}

h2 {
  color: #292929;
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
}

h3 {
 text-align: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

button {
  margin: 0 160px;
}
</style>