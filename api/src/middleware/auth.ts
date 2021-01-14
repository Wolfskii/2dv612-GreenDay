import * as jwt from 'jsonwebtoken'
const secret: any = process.env.TOKEN_SECRET

/*

HTTP Status cheat sheet

200 — OK
Ok. The request went fine and the content requested was returned. This is normally used on GET requests

201 — Created
The resource was created and the server has acknowledged it. It could be useful on responses to POST or PUT requests. Additionally, the new resource could be returned as part of the response body.

204 — No Content
The action was successful but there is no content returned. Useful for actions that do not require a response body, such as a DELETE action.

301 — Moved Permanently
This resource was moved to another location and the location is returned. This header is especially useful when URLs change over time (maybe due to a change in version, a migration, or some other disruptive change), keeping the old ones and returning a redirection to the new location allows old clients to update their references in their own time.

400 — Bad Request
The request issued has problems (for example, might be lacking some required parameters). A good addition to a
400 response might be an error message that a developer can use to fix the request.

401 — Unauthorized
Especially useful for authentication when the requested resource is not accessible to the user owning the request

403 — Forbidden
The resource is not accessible, but unlike 401, authentication will not affect the response.

404 — Not Found
The URL provided does not identify any resource. A good addition to this response could be a set of valid URLs that the client can use to get back on track (root URL, previous URL used, etc.).

405 — Method Not Allowed
The HTTP verb(e.g POST, GET, PUT etc)used on a resource is not allowed — for instance, doing a PUT on a resource that is read-only.

500 — Internal Server Error
A generic error code when an unexpected condition is met and the server crashes. Normally, this response is accompanied by an error message explaining what went wrong.

*/

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
/**
 *
 * @desc checks if token is valid and that it exists
 * @param req
 * @param res
 * @param next
 */
export const user = (req: any, res: any, next: any): any => {
  const token = req.header('x-auth-token')

  /* Check for token */
  /* 401 means that the user is unauthorized */
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'Authorization denied because no token exists' })
  }

  try {
    const decoded = jwt.verify(token, secret) // verify token
    req.user = decoded
    next()
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' }) // bad request
  }
}

/**
 *
 * @desc checks if user is admin
 * @param req
 * @param res
 * @param next
 */
export const admin = (req: any, res: any, next: any): any => {
  const role = req.user.user.role // skitfult, I know... user.user va?
  if (role === 'admin') next()
  else {
    res.status(401).json({
      msg: `Authorization denied. User is not admin. User is: ${role}.`
    })
  }
}

/**
 *
 * @desc checks if user is producer
 * @param req
 * @param res
 * @param next
 */
export const producer = (req: any, res: any, next: any): any => {
  const role = req.user.user.role // skitfult, I know... user.user va?
  if (role === 'producer') next()
  else {
    res.status(401).json({
      msg: `Authorization denied. User is not producer. User is: ${role}.`
    })
  }
}

/**
 *
 * @desc checks if user is producer/customer
 * @param req
 * @param res
 * @param next
 */
export const customer = (req: any, res: any, next: any): any => {
  const role = req.user.user.role // skitfult, I know... user.user va?
  if (role === 'customer') next()
  else {
    res.status(401).json({
      msg: `Authorization denied. User is not producer nor customer. User is: ${role}.`
    })
  }
}
