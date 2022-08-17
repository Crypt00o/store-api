import { Request, Response } from 'express'
import { generateToken } from '../utils/token_operator'
import { User, UsersModel } from '../models/users.model'
const usermodel = new UsersModel()

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: Array<User> = await usermodel.index()
    res.status(200).json({ users: users })
  } catch (err) {
    res.status(400).json({ error: 'error while getting Users ' })
  }
}

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.params.id as string
    const user = await usermodel.show(user_id)
    res.status(200).json({ user: user })
  } catch (err) {
    res.status(400).json({ error: 'error while getting User ' })
  }
}

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }
    console.log(user)
    const userCreated = await usermodel.create(user)
    const userToken = generateToken(userCreated)
    res.status(200).json({ user: userCreated, user_token: userToken })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'error while Creating User ' })
  }
}
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_id: req.params.id
    }
    const userUpdated = await usermodel.update(user)
    res.status(200).json({ user: userUpdated })
  } catch (err) {
    res.status(400).json({ error: 'error while Updateing User ' })
  }
}
const _delete = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.params.id as string
    const user = await usermodel.delete(user_id)
    if (user) {
      res.status(200).json({ message: 'User Deleted' })
    } else {
      res.status(400).json({ error: 'Can,t Delete , User Not Found' })
    }
  } catch (err) {
    res.status(400).json({ error: 'error while Deleting User ' })
  }
}

export { index, create, show, update, _delete }
