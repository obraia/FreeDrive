import { Router } from "express";
import { AuthRoutes } from "./auth.routes";

function authRoutes (router: Router) {
  return new AuthRoutes(router);
}

export { authRoutes };