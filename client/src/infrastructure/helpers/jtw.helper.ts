import jwt_decode, { JwtPayload } from 'jwt-decode';

class JwtHelper {
  public static is_valid(token?: string | null): boolean {
    if (!token) return false;

    const decoded = jwt_decode<JwtPayload>(token);

    if (!decoded) return false;

    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return false;
    }

    return true;
  }
}

export { JwtHelper };
