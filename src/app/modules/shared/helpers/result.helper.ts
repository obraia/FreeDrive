import { NotFound } from '../presentation/errors/notFound.error'
import { Error } from '../presentation/errors/dtos/error.dto'
import { Unauthorized } from '../presentation/errors/unauthorized.error'
import { BadRequest } from '../presentation/errors/badRequest.error'

class Result<T> {
  constructor(
    private readonly _error: Error | null,
    private readonly _value: T | null,
  ) {
    if (_value && _error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      )
    }
  }

  get success(): boolean {
    return Boolean(this._value)
  }

  get value(): T {
    if (!this._value) {
      throw new Error('No value')
    }

    return this._value
  }

  get error(): Error {
    if (!this._error) {
      throw new Error('No error')
    }

    return this._error
  }

  static ok<U>(value: U): Result<U> {
    return new Result<U>(null, value)
  }

  static unauthorized<U>(message: string): Result<U> {
    const error = new Unauthorized(message)
    return new Result<U>(error, null)
  }

  static notFound<U>(message: string): Result<U> {
    const error = new NotFound(message)
    return new Result<U>(error, null)
  }

  static badRequest<U>(message: string): Result<U> {
    const error = new BadRequest(message)
    return new Result<U>(error, null)
  }
}

export { Result }
