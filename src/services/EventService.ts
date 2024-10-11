import  { type AxiosResponse } from 'axios'
import apiClient from './AxiosClient'

apiClient.interceptors.request.use((request)=>{
  const token = localStorage.getItem('access_token')
  console.log('token', token);
  if(token){
    request.headers['Authorization'] = `Bearer ${token}`
  }
  return request
}, (error)=>{
  return Promise.reject(error)
}
)

export default {
  getEvents(perPage: Number, page: Number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  },
  saveEvent(event: Event){
    return apiClient.post('/events', event)
  },
  getEventsByKeyword(keyword: string, perPage: Number, page: Number) : 
  Promise<AxiosResponse<EventItem[]>> {
    return apiClient.get<EventItem[]>('/events?title='+keyword+'&_limit=' + perPage + '&_page=' + page)
  }
}
