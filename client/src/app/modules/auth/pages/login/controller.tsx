import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout, setToken } from '../../../../../infrastructure/redux/reducers/auth'

import { useAuthService } from '../../../../../infrastructure/services/auth/auth.service'

function useLoginPageController() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { postLogin } = useAuthService()

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onChangeRememberMe = () => {
    setRememberMe((value) => !value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { token } = await postLogin({ username, password, rememberMe })
      dispatch(setToken(token))
      navigate('/drive')
    } catch (error) {
      alert('Invalid username or password')
      dispatch(logout())
    }
  }

  const isValid = () => {
    return username.length > 3 && password.length > 3
  }

  return {
    username,
    password,
    rememberMe,
    onChangeUsername,
    onChangePassword,
    onChangeRememberMe,
    onSubmit,
    isValid,
  }
}

export { useLoginPageController }
