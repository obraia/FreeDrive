import { decode, sign, verify } from 'jsonwebtoken'

class JWT {
  static decode(token: string) {
    return decode(token,)
  }

  static encode(payload: any) {
    return sign(payload, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
  }

  static verify<T>(token: string | null): T | null {
    if (!token) return null

    return verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    }) as T | null
  }
}

export { JWT }
