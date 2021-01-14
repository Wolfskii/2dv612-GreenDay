import * as bcrypt from 'bcryptjs'
import Customer from '../models/Customer'
import User from '../models/User'

const customerController: any = {}

customerController.getCustomer = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const customer = await Customer.findOne({ where: { customer_id: id }, raw: true })
    const user = await User.findOne({ where: { id }, raw: true })

    const combined = { ...user, ...customer }

    return res.json(combined)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

customerController.listCustomers = async (req: any, res: any) => {
  try {
    return res.json(await Customer.findAll())
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

customerController.updateCustomer = async (req: any, res: any) => {
  const id = req.user.id

  try {
    const customer = await Customer.findOne({ where: { customer_id: id } })
    const user = await User.findOne({ where: { id } })

    if (!customer || !user) {
      throw new Error('Error: No customer with id')
    }

    console.log('req.body')
    console.log(req.body)

    customer.setDataValue('first_name', req.body.first_name)
    customer.setDataValue('last_name', req.body.last_name)
    customer.setDataValue('phone', req.body.phone)
    await customer.save()

    user.setDataValue('username', req.body.username)
    user.setDataValue('email', req.body.email)
    user.setDataValue('address_id', req.body.address_id)
    user.setDataValue('role', req.body.role)
    user.setDataValue('is_blocked', req.body.is_blocked)

    // Salting and hashing of the password
    const salt: string = await bcrypt.genSalt(10)
    const hashedPassword: string = await bcrypt.hash(req.body.password, salt)
    user.setDataValue('password', hashedPassword)

    await user.save()

    return res.json(customer)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

customerController.deleteCustomer = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const customer = await Customer.findOne({ where: { id } })
    // TODO: Ok to throw errors?
    if (!customer) {
      throw new Error('Error: No customer with id')
    }
    await customer.destroy()
    return res.sendStatus(200)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

export default customerController
