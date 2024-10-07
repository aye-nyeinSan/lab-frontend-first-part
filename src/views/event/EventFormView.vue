<script setup lang="ts">
import type { Event , Organizer } from '@/types'
import { onMounted, ref } from 'vue'
import EventService from '@/services/EventService'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'

import BaseSelect from '@/components/BaseSelect.vue'

const organizers = ref<Organizer[]>([])
onMounted(() => {
  OrganizerService.getOragnizers()
  .then((response) => {
    organizers.value = response.data
  })
  .catch(() => {
    router.push({ name: 'network-error-view' })
  })
})

const event = ref<Event>({
  id: 0,
  title: '',
  category: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: {
    id: 0,
    name: ''
  
  }
})

const router = useRouter()
const store = useMessageStore()

function submitForm(){
    EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view',params:{ id: response.data.id} })
      store.updateMessage('Event was created successfully for '+ response.data.title)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(()=>{
        router.push({ name: 'network-error-view' })
    })
}
</script>
<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="submitForm">
      <BaseInput v-model="event.category" label="category" />
      <h3>Name & describe your event</h3>
      <BaseInput v-model="event.title" label="title" />
      <BaseInput v-model="event.description" label="description" />
      <BaseInput v-model="event.location" label="location" />
      <BaseInput v-model="event.date" label="date" />
      <BaseInput v-model="event.time" label="time" />
      <h3> Who is your organizer?</h3>
      <label> Select an Organizer</label>
    
        <BaseSelect v-model="event.organizer.id" 
        :options="organizers" label="Organizer" />

      <button class="button" type="submit">Submit</button>
    </form>
    <pre>{{ event }}</pre>
  </div>
</template>

<style scoped>
/* Container */
div {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* Form title */
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

/* Section heading */
h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #666;
}

/* Labels */
label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

/* Input fields */
.field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

/* Input field hover and focus effect */
.field:focus {
  border-color: #66afe9;
  outline: none;
  box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
}

/* Submit button */
.button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #5cb85c;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Submit button hover effect */
.button:hover {
  background-color: #4cae4c;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  div {
    padding: 15px;
  }

  h1 {
    font-size: 20px;
  }

  h3 {
    font-size: 16px;
  }

  .button {
    font-size: 14px;
  }
}
</style>
