<script setup lang="ts">
import OrganizerCard from '@/components/OrganizerCard.vue'
import { type Organizer } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'

const router = useRouter()
const organizers = ref<Organizer[] | null>(null)
const totalOrganizers = ref(0)
const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalOrganizers.value / perPage.value)
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
const perPage = computed(() => props.perPage)
onMounted(() => {
  watchEffect(() => {
    OrganizerService.getOragnizers(perPage.value, page.value)
      .then((response) => {
        //console.log(response.data);
        
        organizers.value = response.data
        console.log(organizers.value);
        
        totalOrganizers.value = response.headers['x-total-count']
      })
      .catch(() => {
        router.push({ name: 'network-error-view' })
      })
  })
})
</script>

<template>
  <h1>Organizers List</h1>
  <!-- new element -->
  <div class="flex flex-col items-center">
    <OrganizerCard v-for="organizer in organizers" :key="organizer.id" :organizer="organizer" />
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'organizer-list-view', query: { page: page - 1, perPage: perPage } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >

      <RouterLink
        id="page-next"
        :to="{ name: 'organizer-list-view', query: { page: page + 1, perPage: perPage } }"
        rel="next"
        v-if="hasNexPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
