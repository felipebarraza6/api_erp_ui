import { GET } from './api_telemetry.js'

const getProfiles = async(page, client) => {
  const request = await GET(`client_profile/?page=${page}&is_monitoring=true&name_client__icontains=${client}`)
  return request.data
}

const getUser = async(id) => {
  const request = await GET(`users/${id}/`)
  return request.data
}

const api = {
  wells: {
    list: getProfiles
  },
  users: {
    retrieve: getUser
  }
}
export default api
