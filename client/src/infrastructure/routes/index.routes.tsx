import React from 'react'
import { useSelector } from 'react-redux'

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RoutesDom,
} from 'react-router-dom'

import { RootState } from '../redux/store'
import { FilesRoutes } from '../../app/modules/files/routes/files.routes'
import { AuthRoutes } from '../../app/modules/auth/routes/auth.routes'

const Routes: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth)

  const initialRoute = token ? '/drive' : '/login'

  return (
    <BrowserRouter>
      {token ? <FilesRoutes /> : <AuthRoutes />}
      <RoutesDom>
        <Route path="/" element={<Navigate to={initialRoute} replace />} />
      </RoutesDom>
    </BrowserRouter>
  )
}

export { Routes }
