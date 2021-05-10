const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${process.env.PORT}`)
})

app.get("/", (req, res) => {
    res.sendStatus(200)
})

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection
connection.once("open", () =>
    console.log("MongoDB database connected successfully!")
)

const router = require("./routes")
app.use("/api", router)