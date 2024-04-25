<script setup lang="ts">
import router from '@/router';
import type { Category } from '@/services/CategoryService';
import { CategoryService } from '@/services/CategoryService';
import { ref } from 'vue';

const loading = ref<boolean>(false);
const form = ref<Category>({
  name: '',
});
const fv = ref<{
  valid: boolean
  name: {
    valid: boolean
    empty: boolean
    minLenght: boolean
  }
}>({
  valid: false,
  name: {
    valid: false,
    empty: false,
    minLenght: false
  },
});

const validate = () => {
  fv.value.valid = true
  fv.value.name.valid = true
  fv.value.name.empty = false
  fv.value.name.minLenght = false
  if (form.value.name === '') {
    fv.value.name.valid = false
    fv.value.name.empty = true
    fv.value.valid = false
  }
  if (form.value.name.trim() === '') {
    fv.value.name.valid = false
    fv.value.name.empty = true
    fv.value.valid = false
  }
  if (form.value.name.length < 3) {
    fv.value.name.valid = false
    fv.value.name.minLenght = true
    fv.value.valid = false
  }
  return fv.value.valid
}

const save = async () => {
  if (validate()) {
    loading.value = true;
    const result = await CategoryService.create(form.value);

    console.log('Category created: ', result);
    loading.value = false;
    router.push('/categories');
  }
};
</script>

<template>
  <h5>Create Category</h5>
  <form>
    <label>
      Name
      <input :aria-invalid="!fv.name.valid || undefined" v-model="form.name" name="name" placeholder="Category Name"
        type="text">
    </label>
    <small v-if="fv.name.empty"> Can't be empty </small>
  </form>
  <footer>
    <router-link to="/categories">
      <button class="outline">Back</button>
    </router-link>
    <button :aria-busy="loading" :disabled="loading" @click="save">Save</button>
  </footer>
</template>