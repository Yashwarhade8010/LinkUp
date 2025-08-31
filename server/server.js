require("dotenv").config()
const express = require('express');
const { MongoConnect } = require("./mongoConnection");
const {oauthoSession} = require("./config/passport")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors");
const { limiter } = require("./middleware/rateLimiter");


const app = express();

app.use(
  cors({
    origin: ["https://link-up-stbt.vercel.app","http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
oauthoSession(app);
MongoConnect();

app.use("/", limiter, userRoutes);

app.listen(process.env.PORT || 4000, () =>
  console.log("Server started at port " + process.env.PORT)
);
