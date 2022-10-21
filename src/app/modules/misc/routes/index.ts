import { RequestHandler, Router } from "express";
import { MiscRoutes } from "./misc.routes";

function miscRoutes (router: Router, authHandler: RequestHandler) {
  return new MiscRoutes(router, authHandler);
}

export { miscRoutes };