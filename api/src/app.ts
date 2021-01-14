import express, { Request, Response, urlencoded } from 'express'
import cors from 'cors'
import sequelize from './db'

import authRouter from './routes/authRouter'
import producerRouter from './routes/producerRouter'
import customerRouter from './routes/customerRouter'
import categoryRouter from './routes/categoryRouter'
import productRouter from './routes/productRouter'
import listingRouter from './routes/listingRouter'
import searchRouter from './routes/searchRouter'
import messageRouter from './routes/messageRouter'
import subscriptionRouter from './routes/subscriptionRouter'
import userRouter from './routes/userRouter'

const app = express()

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established')
  })
  .catch((err) => {
    console.error(`Database connection error: ${err}`)
  })

/* This allows all CORS */
app.use(cors())

const PORT = process.env.PORT || 4000

/* Middlewares */
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  console.log('test route')
  res.status(200).send('Hello from the API')
})

/* Routes */
app.use('/api/', authRouter)
app.use('/api/', producerRouter)
app.use('/api/', customerRouter)
app.use('/api/', categoryRouter)
app.use('/api/', productRouter)
app.use('/api/', listingRouter)
app.use('/api/', searchRouter)
app.use('/api/', messageRouter)
app.use('/api/', subscriptionRouter)
app.use('/api/', userRouter)

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
