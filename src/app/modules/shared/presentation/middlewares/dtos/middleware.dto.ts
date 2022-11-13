import { NextFunction, Request, Response } from "express"

interface Middleware {
  handle(request: Request, response: Response, next: NextFunction): Promise<void>
}

export { Middleware }