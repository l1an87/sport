<script>
import FormComponent from './Form.component.vue';
import { addActivity, addActivityPhoto } from '@/modules/Activity/Activity.api';

export default {
  components: {
    FormComponent,
  },
  data: () => ({
    form: {
      name: '',
      description: '',
      distance: 0,
      sportType: 7,
      time: '',
      date: '',
      startTime: '',
      elapsedTime: 0,
      movingTime: 0,
      averageSpeed: 0,
      maxSpeed: 0,
      perceivedExertion: 0,
      file: null,
    },
    valid: true,
    loading: false,
  }),
  methods: {
    async handlerSubmit() {
      if (this.loading || !this.$refs.form.validate()) {
        return;
      }
      const { form } = this;
      const { activity } = await addActivity({
        name: form.name,
        sportType: +form.sportType,
        startTime: new Date(`${form.date}T${form.time}:00`).toISOString(),
        elapsedTime: +form.movingTime * 60,
        movingTime: +form.movingTime * 60,
      });
      if (form.file) {
        await addActivityPhoto(activity.id, form.file);
      }
      this.init();
      this.$emit('submit');
      this.$emit('close');
    },
    init() {
      this.loading = false;
      this.form.name = '';
      this.form.sportType = 7;
      this.form.time = '';
      this.form.file = null;
      const d = new Date();
      this.form.date = `${d.getFullYear()}-${(d.getMonth() + 1).toString()
        .padStart(2, '0')}-${(d.getDate()).toString()
        .padStart(2, '0')}`;
      d.setMonth(d.getMonth() - 1);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <v-card>
    <slot name="header"></slot>
    <v-card-text>
      <FormComponent
        ref="form"
        :form="form"
        v-model="valid"
      />
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="$emit('close')">Отмена</v-btn>
      <v-btn color="primary" @click="handlerSubmit">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style lang="scss">

</style>
