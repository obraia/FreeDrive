import { RequestHandler, Router } from 'express'

type Route = [
  method: 'get' | 'post' | 'patch' | 'delete',
  path: string,
  handler: RequestHandler | RequestHandler[],
]

class BaseRoutes {
  constructor(protected router: Router) {}

  protected load(
    base: string,
    routes: Route[],
    globalHandler?: RequestHandler | RequestHandler[],
  ): void {
    routes.forEach(([method, path, handlers]) => {
      this.router[method](base + path, globalHandler || [], handlers)
    })
  }
}

export { BaseRoutes }
