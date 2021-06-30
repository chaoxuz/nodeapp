const express = require("express")
const mongoose = require("mongoose")
const app = express()
const mongoURL = 'mongodb://root:mvakqo,119@mongo:27017'
//const mongoURL = 'mongodb://172.31.9.153:27017'
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

const connectionRetry = () => {
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>console.log("successfully connected to DB"))
        .catch((e)=>{
	console.log(e)
	setTimeout(connectionRetry, 1000)
	})
}

connectionRetry()

//mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true })
//	.then(()=>console.log("successfully connected to DB"))
//	.catch((e)=>console.log(e))


app.use(express.json());
app.get("/", (req, res)=>{
    res.send("<h2>Hi there-compose123!</h2>");
})


app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`))
