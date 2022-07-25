import { useAxios } from '../../../app/modules/shared/hooks/useAxios'

const useAuthService = () => {
  const axios = useAxios()

  interface IPostLoginProps {
    username: string
    password: string
    rememberMe?: boolean
  }

  interface IPostLoginResponse {
    token: string
  }

  const postLogin = async (props: IPostLoginProps) => {
    const { data } = await axios.post<IPostLoginResponse>('/login', props)
    return data
  }

  return {
    postLogin,
  }
}

export { useAuthService }
