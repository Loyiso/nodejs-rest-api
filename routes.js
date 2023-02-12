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
})
 
routers.get('/:id', async (req, res) => {
 
	try {
		const product = await Product.findById(req.params.id)
		if(product == null) {
			res.status(404).json({message: 'product not found'}) 
		}

		res.json(product)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
 
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
})

routers.put('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if(product == null) {
			res.status(404).json({message: 'product not found'}) 
		}

		product.name = req.body.name
		product.description = req.body.description
		product.features = req.body.features
 
		product.save()

		res.status(200).json({message: 'product updated successfully'}) 

	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

routers.delete('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if(product == null) {
			res.status(404).json({message: 'product not found'}) 
		}

		product.remove()
 
		res.status(200).json({message: 'product deleted successfully'}) 
		 
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

export default routers; 