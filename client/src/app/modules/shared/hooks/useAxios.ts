import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../infrastructure/redux/store'

const useAxios = () => {
  const { token } = useSelector((state: RootState) => state.auth)

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return api
}

export { useAxios }
