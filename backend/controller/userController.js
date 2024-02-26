const asyncHandler = require("express-async-handler");

const User =  require("../models/userModel");
const {generateToken} = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
   
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const url = req.protocol + '://' + req.get('host');
    
    let userData = {
      name,
      email,
      password
    };
    
    if(req.file) {
      userData = {...userData, pic : url + '/uploads/' + req.file.filename}
    }

    const user = await User.create(userData);
    
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id)
        });
      } else {
        res.status(400);
        throw new Error("User not found");
      }
});

// Login User
const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

     const user =  await User.findOne({email});

     if(user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
     } else {
        res.status(400);
        throw new Error("Invalid Email or Password!");
     }
});

const allUsers = asyncHandler( async(req, res) => {
  // mongoDb operators, i is for caseinsensetive 
  // based on the search value it will get the users have value in name or email
  const keyword = req.query.search
  ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
  : {};

  console.log(req.query, keyword);

  // get the list of all users except the current user $ne : notequal 
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);

}
)
module.exports= {registerUser, authUser, allUsers}