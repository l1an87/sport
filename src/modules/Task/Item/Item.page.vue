<script>
import ItemComponent from './Item.component.vue';

export default {
  components: {
    ItemComponent,
  },
  props: {
    taskId: [Number, String],
    taskRuleId: [Number, String],
  },
};
</script>
<template>
  <ItemComponent
    :id="+taskId"
    :ruleId="+taskRuleId"
  />
</template>
<style lang="scss">

</style>
