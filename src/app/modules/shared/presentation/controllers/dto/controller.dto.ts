import { Request, Response } from "express"

interface Controller {
  handle(request: Request, response: Response): Promise<void | Response>
}

export { Controller }