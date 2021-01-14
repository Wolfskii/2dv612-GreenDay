/* eslint-disable camelcase */
import Subscription from '../models/Subscription'
import Producer from '../models/Producer'

const subscriptionController: any = {}

subscriptionController.getSubscriptions = async (req: any, res: any) => {
  const user_id = req.user.id
  try {
    return res.json(await Subscription.findAll({ where: { user_id } }))
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

subscriptionController.getProducersSubscribedTo = async (req: any, res: any) => {
  const user_id = req.user.id
  try {
    return res.json(await Subscription.findAll({ where: { user_id }, include: [{ model: Producer }] }))
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

subscriptionController.addSubscription = async (req: any, res: any) => {
  const user_id = req.user.id
  const producer_id = req.body.producer_id
  try {
    const subscription = await Subscription.create({
      user_id: user_id,
      producer_id: producer_id
    })
    return res.json(subscription)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

subscriptionController.removeSubscription = async (req: any, res: any) => {
  const producer_id = req.params.id
  const user_id = req.user.id
  try {
    const subscription = await Subscription.findOne({ where: { user_id: user_id, producer_id: producer_id } })
    // TODO: Ok to throw errors?
    if (!subscription) {
      throw new Error('Error: No subscription with id')
    }
    await subscription.destroy()
    return res.sendStatus(200)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

export default subscriptionController
