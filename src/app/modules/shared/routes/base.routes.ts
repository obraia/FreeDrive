import { RequestHandler, Router } from 'express'

interface Route {
  method: 'get' | 'post' | 'patch' | 'delete'
  path: string
  handler: RequestHandler
  middlewares?: RequestHandler[]
}

class BaseRoutes {
  constructor(protected _router: Router) {}

  protected load(routes: Route[]) {
    routes.forEach(({ method, path, handler, middlewares }) => {
      if (middlewares?.length) {
        this._router[method](path, middlewares, handler)
      } else {
        this._router[method](path, handler)
      }
    })
  }
}

export { BaseRoutes }
