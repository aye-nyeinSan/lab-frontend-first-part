<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Organizer } from '@/types'

const props = defineProps<{
  organizer: Organizer
  id: String
}>()
const { organizer } = toRefs(props)
</script>
<template>
  <p>{{ organizer.name }} @ {{ organizer.address }}</p>
  <p>{{ organizer.organizationName }}</p>
</template>
