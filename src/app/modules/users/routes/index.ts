import { RequestHandler, Router } from "express";
import { UsersRoutes } from "./users.routes";

function usersRoutes (router: Router, authHandler: RequestHandler) {
  return new UsersRoutes(router, authHandler);
}

export { usersRoutes };