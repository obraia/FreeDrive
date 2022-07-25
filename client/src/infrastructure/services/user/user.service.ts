import { useAxios } from '../../../app/modules/shared/hooks/useAxios'

export interface Disk {
  total: number
  used: number
}

const useUserService = () => {
  const axios = useAxios()

  const getCurrentUser = async () => {
    const { data } = await axios.get('/users/current')
    return data
  }

  return {
    getCurrentUser,
  }
}

export { useUserService }
