import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: {
        type: JSON,
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
}); 

export default mongoose.model('Products', ProductSchema)
