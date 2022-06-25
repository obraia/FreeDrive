import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Container } from '../../app/modules/shared/components/layout_components/container/styles';
import { Header } from '../../app/modules/shared/components/layout_components/header';
import { Menu } from '../../app/modules/shared/components/menu';
import { Pages } from '../../app/modules/shared/components/layout_components/pages/styles';
import { HomeRoutes } from '../../app/modules/home/routes/home.routes';
import { ContextMenu } from '../../app/modules/shared/components/layout_components/context_menu';
import { Topbar } from '../../app/modules/shared/components/topbar';
import { Storage } from '../../app/modules/shared/components/storage';
import { Aside } from '../../app/modules/shared/components/layout_components/aside/styles';

const Routes: React.FC = () => {
  const menuProps = useSelector((state: RootState) => state.contextMenu);

  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Aside>
          <Menu />
          <Storage total={87292} used={34278} />
        </Aside>
        <Topbar />
        <Pages>
          <HomeRoutes />
        </Pages>
        <ContextMenu {...menuProps}></ContextMenu>
      </Container>
    </BrowserRouter>
  );
};

export { Routes };
