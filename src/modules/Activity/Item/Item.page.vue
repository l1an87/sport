<script>
import ItemComponent from './Item.component.vue';

export default {
  components: {
    ItemComponent,
  },
  props: {
    activityId: [String, Number],
  },
};
</script>
<template>
  <ItemComponent
    :id="+activityId"
  />
</template>
<style lang="scss">

</style>
