import { GET } from './api_telemetry.js'

const getProfiles = async(page) => {
  const request = await GET(`client_profile/?page=${page}&is_monitoring=true`)
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