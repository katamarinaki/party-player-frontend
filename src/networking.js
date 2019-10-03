import axios from 'axios'

const authToken = localStorage.getItem('authtoken')

export { http }

const http = axios.create({
  baseURL: `${process.env.VUE_APP_SERVER}+${process.env.VUE_APP_SERVER_PATH}`,
  headers: { Authorization: `Bearer ${authToken}` },
})
