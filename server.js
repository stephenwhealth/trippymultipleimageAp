require('./config/multDB')
const express = require('express')

const router = require('./router/single')
const port = 5500
const app = express()
app.use(express.json())


app.use(router)

app.use('/api', router)


app.listen(port, ()=>{
    console.log(`server is listen to port: ${port}`)
})