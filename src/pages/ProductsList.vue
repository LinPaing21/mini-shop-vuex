<template>
  <section class="container">
    <ul>
      <product-item
        v-for="prod in products"
        :key="prod.id"
        :id="prod.id"
        :title="prod.title"
        :image="prod.image"
        :description="prod.description"
        :price="prod.price"
      ></product-item>
    </ul>
  </section>
</template>

<script async setup>
import ProductItem from '../components/products/ProductItem.vue';
import { computed, onBeforeMount} from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import config from '../config';

var store = useStore();
const products = computed(() => {
  return store.getters['prods/products'];
})

onBeforeMount(() => {
  console.log('Hello World');
})

await axios.get(config.baseUrl+'/greeting').then((res) => {
  console.log(res);
})
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 40rem;
  }
</style>