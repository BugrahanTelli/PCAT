const express = require("express")
const mongoose = require("mongoose")
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const ejs = require("ejs")
const photoControllers = require("./controllers/photoControllers")
const pageController = require("./controllers/pageController")

const app = express()

//connect db
mongoose.connect("mongodb://localhost/pcat-test-db")

//Template Engine
app.set("view engine", "ejs")

//Middlewares (req ile res arasında yaptığımız işlemler)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}))
//Routes
app.get("/", photoControllers.getAllPhotos)
app.get("/photos/:id", photoControllers.getPhoto)
app.post("/photos", photoControllers.createPhoto)
app.put("/photos/:id", photoControllers.updatePhoto)
app.delete("/photos/:id", photoControllers.deletePhoto)

app.get("/about", pageController.getAboutPage)
app.get("/add", pageController.getAddPage)
app.get("/photos/edit/:id", pageController.getEditPage)


const port = 3000

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`)
})