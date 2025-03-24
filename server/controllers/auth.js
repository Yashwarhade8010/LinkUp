const User = require("../models/user");

const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({message:"All fields required"});
  }

  try {
    const checkUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });
    return res.status(201).json({message:"User registered successfully",user});

  } catch (err) {
    res.status(500).json({message:"Error occured"});
  }
};

const handleLogin = async(req,res)=>{
    const{usernameOrEmail,password} = req.body;
    if(!usernameOrEmail || !password){
        return res.status(400).json({message:"All fields required"})
    }
    try{
        const user = await User.findOne({$or:[{username:usernameOrEmail},{email:usernameOrEmail}]})
        if(!user){
            return res.status(404).json({message:"No user found"})
        }
        const verify = await User.matchPassword(user.password);
        if(verify==false){
            return res.status(400).json({message:"Invalid credentials"})
        }else{
            return res.status(200).json({message:"Logged In successfully",user})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error occured"})
    }
}

module.exports = {
    handleRegister,
    handleLogin
}
