import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/home/home.page';

const FilesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/drive' element={<HomePage />}>
        <Route path={':id'} element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export { FilesRoutes };
