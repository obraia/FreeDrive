import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Container } from '../../app/modules/shared/components/layout_components/container/styles';
import { Header } from '../../app/modules/shared/components/layout_components/header';
import { Menu } from '../../app/modules/shared/components/menu';
import { Pages } from '../../app/modules/shared/components/layout_components/pages/styles';
import { FilesRoutes } from '../../app/modules/files/routes/files.routes';
import { ContextMenu } from '../../app/modules/shared/components/layout_components/contextmenu';
import { Topbar } from '../../app/modules/files/components/topbar';
import { Storage } from '../../app/modules/shared/components/storage';
import { Aside } from '../../app/modules/shared/components/layout_components/aside/styles';
import { Disk, FilesService } from '../services/files/files.service';

const Routes: React.FC = () => {
  const [disk, setDisk] = React.useState<Disk>({ total: 1, used: 1 });
  const menuProps = useSelector((state: RootState) => state.contextMenu);

  useEffect(() => {
    const filesService = new FilesService();

    // filesService.getDiskSpace().then((disk) => {
    //   setDisk(disk);
    // });
  }, []);

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
  );
};

export { Routes };
