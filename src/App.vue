<template>
  <the-header></the-header>
  <Suspense>
    <!-- component with nested async dependencies -->
    <router-view></router-view>

    <!-- loading state via #fallback slot -->
    <template #fallback>
      Loading...
    </template>
</Suspense>
  <bottom-nav></bottom-nav>
</template>

<script>
import TheHeader from './components/nav/TheHeader.vue';
import BottomNav from './components/nav/BottomNav.vue';

export default {
  components: {
    TheHeader,
    BottomNav
}
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>