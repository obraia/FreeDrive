import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home.page";

const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export { HomeRoutes };
