const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({extended: true})) 
app.use('/api/auth', require('./routes/auth.routes'))


async function start() {
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.vl2lnns.mongodb.net/?retryWrites=true&w=majority')

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch(err) {
        console.error(err);
    }
}

start()