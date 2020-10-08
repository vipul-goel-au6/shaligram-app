const {MONGODB_URI} = process.env
const mongoose = require("mongoose")


mongoose.connect(MONGODB_URI,{
    useFindAndModify: false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to database successfully")
})

mongoose.connection.on("err",(err)=>{
    console.log("err connecting",err)
})

module.exports = mongoose