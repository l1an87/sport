<script>
import ItemComponent from './Item.component.vue';

export default {
  components: {
    ItemComponent,
  },
  props: {
    newsId: [String, Number],
  },
};
</script>
<template>
  <ItemComponent
    :id="+newsId"
  />
</template>
<style lang="scss">

</style>
