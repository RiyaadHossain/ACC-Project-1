const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()

// Database Connection
require("./src/Config/DBConnect")

// Middlewares
app.use(express.json())
app.use(cors())

const productRoute = require('./src/Routes/productRoute')
const brandRoute = require('./src/Routes/brandRoute')

// Routes
app.use("/api/v1/product", productRoute)
app.use("/api/v1/brand", brandRoute)

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" })
})

// Listen to Server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`.cyan.bold)
})
