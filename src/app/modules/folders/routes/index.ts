import { RequestHandler, Router } from "express";
import { FoldersRoutes } from "./folders.routes";

function foldersRoutes (router: Router, authHandler: RequestHandler) {
  return new FoldersRoutes(router, authHandler);
}

export { foldersRoutes };