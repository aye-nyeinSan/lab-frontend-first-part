<script setup lang="ts">
import { type Organizer } from '@/types'
defineProps<{
  organizer: Organizer
}>()


</script>

<template>
  <RouterLink class="event-link" :to="{ name: 'organizer-detail-view', params: { id: organizer.id } }">
    <div
      class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp"
    >
      <h2 v-if="organizer">{{ organizer.name }}</h2>
     
    </div>
  </RouterLink>
</template>

<style scoped>
/* .event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
} */
/* .event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
} */

/* h2{ 
  font-size: 20px;
  padding: 8px;
} */
.event-link {
  text-decoration: none;
  color: #2c3e50;
}
</style>
