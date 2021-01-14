/* eslint-disable camelcase */
import User from '../models/User'

const userController: any = {}

userController.updateLastTimeRead = async (req: any, res: any) => {
  const { id } = req.user

  try {
    const user = await User.findOne({ where: { id } })

    if (!user) {
      throw new Error('Error: No producer with id')
    }
    user.setDataValue('last_time_read', new Date())
    await user.save()
    return res.json(user)
  } catch (err: any) {
    console.error(err)
    res.status(400).send(err)
  }
}

export default userController
