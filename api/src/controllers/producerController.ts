/* eslint-disable camelcase */
import * as bcrypt from 'bcryptjs'
import sequelize from '../db'
import Producer from '../models/Producer'
import User from '../models/User'

const producerController: any = {}

producerController.listProducers = async (req: any, res: any) => {
  try {
    return res.json(await Producer.findAll())
  } catch (err: any) {
    res.status(500).send(err)
  }
}

producerController.listProducersAsUsers = async (req: any, res: any) => {
  try {
    const producers = await sequelize.query('SELECT Producer.producer_id, Producer.org_nr, Producer.name, Producer.description, User.username, User.email FROM Producer INNER JOIN User ON Producer.producer_id=User.id')
    return res.json(producers[0])
  } catch (err: any) {
    res.status(500).send(err)
  }
}

producerController.updateProducer = async (req: any, res: any) => {
  const { producer_id } = req.params
  const { name, org_nr, description } = req.body
  try {
    const producer = await Producer.findOne({ where: { producer_id } })
    // TODO: Ok to throw errors?
    if (!producer) {
      throw new Error('Error: No producer with id')
    }
    producer.setDataValue('name', name)
    producer.setDataValue('org_nr', org_nr)
    producer.setDataValue('description', description)
    await producer.save()
    return res.json(producer)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

producerController.producerUpdateProducer = async (req: any, res: any) => {
  const id = req.user.id
  const { name, org_nr, description } = req.body

  try {
    const producer = await Producer.findOne({ where: { producer_id: id } })
    const user = await User.findOne({ where: { id } })

    if (!producer || !user) {
      throw new Error('Error: No producer with id')
    }

    producer.setDataValue('name', name)
    producer.setDataValue('org_nr', org_nr)
    producer.setDataValue('description', description)
    await producer.save()

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

    return res.json(producer)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

producerController.getProducer = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const producer = await Producer.findOne({ where: { producer_id: id }, raw: true })
    const user = await User.findOne({ where: { id }, raw: true })

    const combined = { ...user, ...producer }

    console.log(combined)
    return res.json(combined)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

export default producerController
