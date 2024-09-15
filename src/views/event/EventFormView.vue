<script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
defineProps<{
  event: Event
}>()
const event = ref<Event>({
  id: 0,
  title: '',
  category: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: ''
})

const router = useRouter()

function submitForm(){
    EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view',params:{ id: response.data.id} })
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
      <label>Category</label>
      <input v-model="event.category" type="text" placeholder="Category" class="field" />
      <h3>Name & describe your event</h3>
      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Title" class="field" />
      <label>Description</label>
      <input v-model="event.description" type="text" placeholder="Description" class="field" />
      <h3>What is your event?</h3>
      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Location" class="field" />
      <label>Organizer</label>
      <input v-model="event.organizer" type="text" placeholder="Organizer" class="field" />
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
