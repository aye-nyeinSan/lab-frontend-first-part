import type { Organizer } from '@/types'

import apiClient from './AxiosClient'

export default {
  getOragnizers() {
    return apiClient.get('/organizers')
  },

  // getOragnizers(perPage: Number, page: Number) {
  //   return apiClient.get('/organizers?_limit=' + perPage + '&_page=' + page)
  // },
  getOrganizer(id: number) {
    return apiClient.get('/organizers/' + id)
  },
  saveOragnizer(organizer: Organizer) {
    return apiClient.post('/organizers', organizer)
  }
}
