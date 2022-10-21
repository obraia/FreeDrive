import { RequestHandler, Router } from "express";
import { FilesRoutes } from "./files.routes";

function filesRoutes (router: Router, authHandler: RequestHandler) {
  return new FilesRoutes(router, authHandler);
}

export { filesRoutes };