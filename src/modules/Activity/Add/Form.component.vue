<script>
export default {
  props: {
    value: Boolean,
    form: Object,
  },
  data: () => ({
    valid: true,
    maxDate: '',
    minDate: '',
  }),
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
  },
  mounted() {
    const d = new Date();
    this.maxDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString()
      .padStart(2, '0')}-${(d.getDate()).toString()
      .padStart(2, '0')}`;
    d.setMonth(d.getMonth() - 1);
    this.minDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString()
      .padStart(2, '0')}-${(d.getDate()).toString()
      .padStart(2, '0')}`;
  },
};
</script>
<template>
  <v-form v-if="form" ref="form" :value="value" @input="$emit('input', $event)" lazyValidation>
    <v-text-field
      label="Название"
      v-model="form.name"
      required
      :rules="[v=>!!v || 'Обязательное поле']"
    />
    <v-date-picker
      v-model="form.date"
      full-width
      :min="minDate"
      :max="maxDate"
      no-title
    ></v-date-picker>
    <v-text-field
      label="Время"
      v-model="form.time"
      placeholder="чч:мм"
      v-mask="'##:##'"
      :rules="[ v => !!v || 'Введите время', v=> (v || '').length === 5 || 'Введите время']"
      required
    ></v-text-field>
    <v-text-field
      label="Время тренировки (мин.)"
      v-model="form.movingTime"
      required
      type="number"
      :rules="[v=>!!v || 'Обязательное поле']"
    />
    <v-file-input
      v-model="form.file"
      :rules="[v => !v || v.size < 5000000 || 'Максимальный размер 5МБ!']"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Загрузите фото"
      prepend-icon="mdi-camera"
      label="Фото тренировки"
    ></v-file-input>
  </v-form>
</template>
<style lang="scss">

</style>
