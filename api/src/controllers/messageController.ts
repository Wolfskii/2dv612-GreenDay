/* eslint-disable camelcase */
import Message from '../models/Message'
import User from '../models/User'
import sequelize from '../db'

const messageController: any = {}

// Get all unread messages
// Could be improved...
messageController.getNewMessages = async (req: any, res: any) => {
  try {
    const { id } = req.user
    const user = await User.findOne({
      where: { id }
    })
    if (!user) {
      return res.status(400)
    }
    const messages = await sequelize.query(
      `SELECT * FROM Message WHERE '${id}' IN (SELECT user_id FROM Subscription WHERE producer_id = Message.producer_id);`
    )
    const newMessages = messages[0].filter(
      (message: any) =>
        new Date(message.created_at) >=
        new Date(user.getDataValue('last_time_read'))
    )
    res.json(newMessages)
  } catch (err) {
    console.error(err)
    res.status(400).send(err)
  }
}

// Get last 10 messages from all producers subscribed to
messageController.getLast10Messages = async (req: any, res: any) => {
  const { id } = req.user
  try {
    const messages = await sequelize.query(
      `SELECT * FROM Message WHERE '${id}' IN (SELECT user_id FROM Subscription WHERE producer_id = Message.producer_id) ORDER BY created_at DESC LIMIT 10;`
    )
    res.json(messages[0])
  } catch (err) {
    console.error(err)
    res.status(400).send(err)
  }
}

// Get all messages from all producers subscribed to
messageController.getAllMessages = async (req: any, res: any) => {
  const { id } = req.user
  console.log(id)
  try {
    const messages = await sequelize.query(
      `SELECT * FROM Message WHERE '${id}' IN (SELECT user_id FROM Subscription WHERE producer_id = Message.producer_id) ORDER BY created_at DESC LIMIT 10;`
    )
    res.json(messages[0])
  } catch (err) {
    console.error(err)
    res.status(400).send(err)
  }
}

messageController.getMessagesFromProducer = async (req: any, res: any) => {
  const id = req.user.id

  try {
    const messages = await Message.findAll({
      where: { producer_id: id },
      order: [['created_at', 'DESC']]
    })
    return res.json(messages)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

messageController.createMessage = async (req: any, res: any) => {
  const id = req.user.id
  try {
    const messageInfo = req.body
    const message = await Message.create({
      producer_id: id,
      text: messageInfo.message,
      url: messageInfo.url
    })
    return res.json(message)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

messageController.updateMessage = async (req: any, res: any) => {
  const { id } = req.params
  const { text, url } = req.body
  try {
    const message = await Message.findOne({ where: { message_id: id } })
    if (!message) {
      throw new Error('Error: No message with id')
    }
    message.setDataValue('text', text)
    message.setDataValue('url', url)
    message.setDataValue('created_at', new Date())

    await message.save()
    return res.json(message)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

messageController.deleteMessage = async (req: any, res: any) => {
  const { id } = req.params
  try {
    const message = await Message.findOne({ where: { message_id: id } })
    if (!message) {
      throw new Error('Error: No message with id')
    }
    await message.destroy()
    return res.sendStatus(200)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

export default messageController
