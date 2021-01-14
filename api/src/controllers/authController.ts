import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import User from '../models/User'
import Customer from '../models/Customer'
import Producer from '../models/Producer'
import sequelize from '../db'
import { Transaction } from 'sequelize/types'

const authController: any = {}

/**
 * API Endpoint for registering a customer.
 * @param req
 * @param res
 * Returns the token in auth-token header and in the res.body.
 */
authController.registerCustomer = async (req: any, res: any) => {
  const transaction = await sequelize.transaction()
  try {
    req.body.role = 3
    const userId = await registerUser(req, res, transaction)
    await Customer.create(
      {
        customer_id: userId,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        phone: req.body.phone
      },
      { transaction }
    )
    const token = await signToken(userId)
    await transaction.commit()
    const user = await getUser(userId)
    return res.header('auth-token', token).send({
      token: token,
      user: user
    })
  } catch (err: any) {
    console.error(err)
    await transaction.rollback()
    res.status(400).send(err)
  }
}

/**
 * API Endpoint for registering a producer.
 * @param req
 * @param res
 * Returns the token in auth-token header and in the res.body.
 */
authController.registerProducer = async (req: any, res: any) => {
  const transaction = await sequelize.transaction()
  try {
    req.body.role = 4
    const userId = await registerUser(req, res, transaction)
    const producer = await Producer.create(
      {
        producer_id: userId,
        org_nr: req.body.orgnr,
        name: req.body.name,
        description: req.body.description
      },
      { transaction }
    )
    await transaction.commit()
    res.json(producer)
  } catch (err: any) {
    console.error(err)
    await transaction.rollback()
    res.status(400).send(err)
  }
}

/**
 * API Endpoint for login.
 * @param req API Endpoint
 * @param res
 */
authController.login = async (req: any, res: any) => {
  // Check if the user exists in DB
  const existingUser = await User.findOne({
    where: { username: req.body.username }
  })

  const errorMsg =
    'Användarnamnet eller lösenordet är fel. Vänligen kontrollera!'

  if (existingUser === null) {
    return res.status(400).send({ status: 400, data: null, message: errorMsg })
  }

  // Checks if the provided password matches the hashed one in the DB
  const isPasswordCorrect: boolean = await bcrypt.compare(
    req.body.password,
    existingUser.getDataValue('password')
  )

  // If it doesn't match, return error message
  if (!isPasswordCorrect) {
    return res.status(400).send({ status: 400, data: null, message: errorMsg })
  }

  // Create and assign a JWT-token
  const token = await signToken(existingUser.getDataValue('id'))
  const user = await getUser(existingUser.getDataValue('id'))
  return res.send({
    token: token,
    user: user
  })
}

/**
 * API Endpoint for deleting a user.
 * @param req
 * @param res
 */
authController.deleteUser = async (req: any, res: any) => {
  try {
    const userTobeDeleted = await User.findOne({ where: { id: req.params.id } })
    if (!userTobeDeleted) {
      throw new Error('Error: No user with id')
    }
    userTobeDeleted.destroy()
    res.status(200).send()
  } catch (err: any) {
    res.status(400).send(err)
  }
}

/**
 * Method for register User, common for endpoints "register customer" and "register producer".
 * @param req
 * @param res
 * @return
 */
const registerUser = async (req: any, res: any, transaction: Transaction) => {
  // Check so the user doesn't already exist in DB
  const existingUser = await User.findOne({
    where: { username: req.body.username }
  })
  if (existingUser) {
    return res.status(400).send('User with entered username already exists')
  }

  // Salting and hashing of the password
  const salt: string = await bcrypt.genSalt(10)
  const hashedPassword: string = await bcrypt.hash(req.body.password, salt)

  try {
    // Create new user from request body and save to DB
    const savedUser = await User.create(
      {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        is_blocked: false
      },
      { transaction }
    )
    return savedUser.getDataValue('id')
  } catch (err) {
    res.status(400).send(err)
  }
}

const signToken = async (userId: number) => {
  if (!process.env.TOKEN_SECRET) {
    throw new Error('Error: No JWT token secret')
  }

  const user = await getUser(userId)

  return jwt.sign({ id: userId, user: user }, process.env.TOKEN_SECRET)
}

/**
 * @route GET api/auth/user
 * @desc get user data
 * @access Private
 */
authController.user = async (req: any, res: any) => {
  const user = await getUser(req.user.id)
  res.json(user)
}

/**
 * @route used by api/auth/user & api/login &
 * @desc retrieves user
 * @param id
 * @access Public
 */
const getUser = async (id: number) => {
  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id: id }
  })

  return user
}

export default authController
