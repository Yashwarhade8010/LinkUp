require("dotenv").config()
const {connect} = require("mongoose")
const MongoConnect = async()=>{
   try{
    const mongo = await connect(process.env.MONGO_URI);
    console.log("mongoDb connected at host: "+mongo.connection.host)
   }catch(err){
    console.log(err)
    process.exit(1);
   }
}


module.exports={
    MongoConnect
}