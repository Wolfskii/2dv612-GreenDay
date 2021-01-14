import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

// https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
interface AuthRequest extends Request {
  user?: string
}

export function verify (req: AuthRequest, res: Response, next: NextFunction): any {
  const token = req.header('auth-token')

  // If there is no token in the auth-token header of the request -> Deny access
  if (!token) {
    return res.status(401).send('Access denied')
  }

  if (!process.env.TOKEN_SECRET) {
    throw new Error()
  }
  try {
    const verified: any = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (err) {
    return res.status(400).send('Invalid token')
  }
}
