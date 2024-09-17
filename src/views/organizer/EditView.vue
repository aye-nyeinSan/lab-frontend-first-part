<script setup lang="ts">
import { toRefs } from 'vue'
import { type Organizer} from '@/types'

const props = defineProps<{
  organizer: Organizer
  id: String
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { organizer } = toRefs(props)
</script>
<template>
  <p>Edit organizer here</p>
</template>
