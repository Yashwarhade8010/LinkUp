require("dotenv").config()
const express = require('express');
const { MongoConnect } = require("./mongoConnection");
const {oauthoSession} = require("./config/passport")
const userRoutes = require("./routes/userRoutes")

MongoConnect()

const app = express();

app.use(express.json());
oauthoSession(app);

app.use("/",userRoutes);

app.listen(process.env.PORT,()=>console.log("Server started at port "+process.env.PORT));