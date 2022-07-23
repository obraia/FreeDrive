import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../../app/modules/shared/components/layout/container/styles'
import { Header } from '../../app/modules/shared/components/layout/header'
import { Menu } from '../../app/modules/shared/components/menu'
import { Pages } from '../../app/modules/shared/components/layout/pages/styles'
import { FilesRoutes } from '../../app/modules/files/routes/files.routes'
import { ContextMenu } from '../../app/modules/shared/components/layout/contextmenu'
import { Topbar } from '../../app/modules/files/components/topbar'
import { Storage } from '../../app/modules/shared/components/storage'
import { Aside } from '../../app/modules/shared/components/layout/aside/styles'
import { Disk } from '../services/file/file.service'
import { FolderService } from '../services/folder/folder.service'
import { UserService } from '../services/user/user.service'
import { setUser } from '../redux/reducers/profile'

const Routes: React.FC = () => {
  const [disk, setDisk] = React.useState<Disk>({ total: 1, used: 1 })
  const menuProps = useSelector((state: RootState) => state.contextMenu)

  const dispatch = useDispatch()

  useEffect(() => {
    const folderService = new FolderService()
    const userService = new UserService()

    userService
      .getUserById('62d6d830086d2fb4618a0d86')
      .then((user) => {
        dispatch(setUser(user))
      })
      .catch((err) => {
        console.error(err)
      })

    // folderService.getDiskSpace().then((disk) => {
    //   setDisk(disk);
    // });
  }, [])

  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Aside>
          <Menu />
          <Storage total={disk.total} used={disk.used} />
        </Aside>
        <Topbar />
        <Pages>
          <FilesRoutes />
        </Pages>
        <ContextMenu {...menuProps}></ContextMenu>
      </Container>
    </BrowserRouter>
  )
}

export { Routes }
