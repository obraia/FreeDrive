import { decode, sign, verify } from 'jsonwebtoken'

class JWTHelper {
  static decode(token: string) {
    return decode(token)
  }

  static encode(payload: any) {
    return sign(payload, process.env.JWT_SECRET)
  }

  static verify(token: string) {
    return verify(token, process.env.JWT_SECRET)
  }
}

export { JWTHelper }
