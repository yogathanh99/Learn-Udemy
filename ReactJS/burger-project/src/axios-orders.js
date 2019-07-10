import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-app-react-thanhvo.firebaseio.com/'
})

export default instance
