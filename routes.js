import express from 'express'
import Product from './models/ProductModel.js'

const routers = express.Router()
routers.get('/', async (_req, res) => {

	try {
		const products = await Product.find()
		res.json(products)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
});

routers.post('/', async (req, res) => {
	const product = new Product({
		name: req.body.name,
		description: req.body.description,
		features: req.body.features,
	})
  
	try {
		const newProduct = await product.save()
		res.json(newProduct)
	} catch (error) {
		res.status(500).json({ message: error.message })
	} 
});

routers.put('/', function (req, res) {
	res.status(200).json({ msg: ' PUT request.' });
});

routers.delete('/', function (req, res) {
	res.status(200).json({ msg: 'DELETE request.' });
});

export default routers; 