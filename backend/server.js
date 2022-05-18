const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT

connectDB() // fonksiyonu burda calistiriyorum

const app = express()

app.use(express.json()) // json'lari okuyabilmesi icin
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes')) // burda route'lari belirtiyorum

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))