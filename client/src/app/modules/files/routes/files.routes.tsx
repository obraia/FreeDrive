import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApiPage } from '../pages/api.page';
import { FavoritesPage } from '../pages/favorites.page';
import { HomePage } from '../pages/home.page';
import { TrashPage } from '../pages/trash.page';

const FilesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/drive' element={<HomePage />}>
        <Route path={':id'} element={<HomePage />} />
      </Route>
      <Route path='/favorites' element={<FavoritesPage />} />
      <Route path='/api' element={<ApiPage />} />
      <Route path='/trash' element={<TrashPage />} />
    </Routes>
  );
};

export { FilesRoutes };
