import express, { json } from 'express' 
import routes from './routes.js'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'

import * as dotenv from 'dotenv'
dotenv.config()

let appInsights = require("applicationinsights");
appInsights.setup(process.env.DATABASE_URL).start();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
 
const app = express()
 
app.use(json())

const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 15,  
    handler: function (req, res) {
        return res.status(429).json({
          error: 'You sent too many requests. Please wait a while then try again'
        })
    }
})

app.use(apiRequestLimiter)
 
const port = process.env.PORT || 3000;

app.use('/api/products', routes);
 
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});