import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { FavoritesPage } from '../pages/favorites'
import { StaticPage } from '../pages/static'
import { TrashPage } from '../pages/trash'
import { Header } from '../../shared/components/layout/header'
import { Aside } from '../../shared/components/layout/aside/styles'
import { Menu } from '../../shared/components/menu'
import { Storage } from '../../shared/components/storage'
import { Topbar } from '../components/topbar'
import { Pages } from '../../shared/components/layout/pages/styles'
import { ContextMenu } from '../../shared/components/layout/contextmenu'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../infrastructure/redux/store'
import { Container } from '../../shared/components/layout/container/styles'
import { Disk } from '../../../../infrastructure/services/file/file.service'
import { useUserService } from '../../../../infrastructure/services/user/user.service'
import { setUser } from '../../../../infrastructure/redux/reducers/auth'
import { useFolderService } from '../../../../infrastructure/services/folder/folder.service'
import { SearchPage } from '../pages/search'

const FilesRoutes: React.FC = () => {
  const [disk, setDisk] = useState<Disk>({ total: 1, used: 1 })

  const { token, user } = useSelector((state: RootState) => state.auth)
  const menuProps = useSelector((state: RootState) => state.contextMenu)
  const dispatch = useDispatch()

  const { pathname } = useLocation()
  const { getCurrentUser } = useUserService()
  const { getDiskSpace } = useFolderService()

  const isFilesRoute = () => {
    return ['/drive', '/favorites', '/trash', '/static', '/search'].some((route) =>
      pathname.includes(route),
    )
  }

  useEffect(() => {
    if (!token) return

    getCurrentUser().then((user) => {
      dispatch(setUser(user))
    })

    getDiskSpace().then((disk) => {
      setDisk(disk)
    })
  }, [token])

  if (!isFilesRoute() || !user) {
    return null
  }

  return (
    <Container>
      <Header />
      <Aside>
        <Menu />
        <Storage total={disk.total} used={disk.used} />
      </Aside>

      <Topbar />

      <Pages>
        <Routes>
          <Route path="/drive" element={<HomePage parentId={user.driveFolderId} />}>
            <Route path={':id'} element={<HomePage />} />
          </Route>
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route
            path="/static"
            element={<StaticPage parentId={user.staticFolderId} />}>
            <Route path={':id'} element={<StaticPage />} />
          </Route>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/trash" element={<TrashPage />} />
        </Routes>
      </Pages>

      <ContextMenu {...menuProps}></ContextMenu>
    </Container>
  )
}

export { FilesRoutes }
