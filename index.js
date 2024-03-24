import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import LoginRouter from './route/login.js';
import SignupRouter from './route/signup.js';
import ProductRouter from './route/products.js';
import AddressRoute from './route/address.js';
import CartRouter from './route/cart.js';
import dotenv from "dotenv"
dotenv.config()
const Login = express()

Login.use(cors())

Login.use(express.json())

Login.use('/login', LoginRouter)

Login.use('/signup', SignupRouter)

Login.use('/products', ProductRouter)

Login.use('/address', AddressRoute)

Login.use('/cart', CartRouter)

const port = 8080;

const {DB_URL} = process.env 

Login.listen(process.env.PORT || port , () => {
    console.log('connected to ', port)
})

mongoose.connect(DB_URL)
.then(() => console.log('connected to db'))

