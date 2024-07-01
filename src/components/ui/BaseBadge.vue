<template>
  <span class="badge" :class="['badge--' + mode, {nml: noMarginLeft}]">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: ['mode', 'noMarginLeft']
}
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.15rem 0.75rem;
  background-color: #ccc;
  color: #292929;
  margin: 0 0.5rem;
  border-radius: 15px;
}

.nml {
  margin-left: 0;
}

.badge--highlight {
  background-color: #f0b800;
  color: black;
}

.badge--elegant {
  background-color: #45006d;
  color: white;
}
</style>