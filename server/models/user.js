const {Schema,model} = require('mongoose')
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        trim: true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        trim: true,
        required:true,
        lowercase: true,
    },
    password:{
        type:String,
        required:true
    },
    followers:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    posts:[{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }]
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified){
        return next();
    }
    const hashedPassword = await bcrypt.hash(this.password,10);
    this.password = hashedPassword;
    next()
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

const User = model("User",userSchema);

module.exports = User