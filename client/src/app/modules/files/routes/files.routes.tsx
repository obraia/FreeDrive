import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { FavoritesPage } from '../pages/favorites'
import { StaticPage } from '../pages/static'
import { TrashPage } from '../pages/trash'

const FilesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/drive" element={<HomePage />}>
        <Route path={':id'} element={<HomePage />} />
      </Route>
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/static" element={<StaticPage />}>
        <Route path={':id'} element={<TrashPage />} />
      </Route>
      <Route path="/trash" element={<TrashPage />} />
    </Routes>
  )
}

export { FilesRoutes }
