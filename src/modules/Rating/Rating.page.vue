<script>
import FormComponent from './Form.component.vue';
import ListComponent from './List.component.vue';

export default {
  components: {
    FormComponent,
    ListComponent,
  },
  data: () => ({
    type: 'month',
    date: new Date(),
  }),
};
</script>
<template>
  <div class="">
    <v-card>
      <FormComponent
        :type.sync="type"
        :date.sync="date"
      />
      <v-divider/>
      <ListComponent
        :type="type"
        :date="date"
      />
    </v-card>
  </div>
</template>
<style lang="scss">

</style>
