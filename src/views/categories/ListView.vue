<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CategoryService, type Category } from '@/services/CategoryService'

const categories = ref<Category[]>([])
const loading = ref<boolean>(false)

onMounted(async () => {
    loading.value = true
    categories.value = await CategoryService.getAll()
    loading.value = false
})
</script>

<template>
    <div>
        <progress v-if="loading" />
        <ul>
            <li v-for="cat in categories" :key="cat.id">{{ cat.name }}</li>
        </ul>
    </div>
    <footer>
        <router-link to="/categories/create">
            <button>New</button>
        </router-link>
    </footer>
</template>
