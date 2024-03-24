import express from 'express';
import product from '../models/productschema.js';

const CartRouter = express.Router()

CartRouter.use(express.json())

CartRouter.post('/', async(req, res) => {
    try {
        const cartArray =  req.body 
    console.log('cart array length', cartArray.length)
    if (cartArray.length === 0) {
        return res.status(201).json({status : 201, message : 'Empty Cart'})
    }
    console.log(cartArray[0].length)
     console.log("cartArray from frontend is", cartArray)
    let checkOutProductsArray = []
    for(let i=0; i<cartArray.length; i++) {
        console.log('entering loop 16')
        const existingProduct = parseInt(cartArray[i].id )
        const updatedQuantity = parseInt(cartArray[i].quantity)
        console.log('loop existingproduct', existingProduct)
        await product.updateOne({id : existingProduct}, {$set : {
            quantity : updatedQuantity
        }})
       const p =  await product.findOne({id : existingProduct})
       console.log('product p in database', p)
       checkOutProductsArray.push(p)
       
    }
    console.log('line 21', checkOutProductsArray)
    return res.status(200).json({status : 200, result : checkOutProductsArray})
    }

    catch(err) {
        return res.status(500).json({status : 500, message : err})
    }
})

export default CartRouter