import userModel from "../models/userModel.js";

// need to pass middleware directly, if you need middleware inside handler.e.g next
export const registerController = async (req, res, next) => {
    try {
          const {name, email, password, lastname} = req.body;
          //validations
          if (!name) {
             return res.status(400).send({success: false, message: "please provide name"});
            // by error middleware
            // next("please provide name")
            // not using error middleware here because error status code is same for all errors i.e 500
          }
          if (!email) {
            return res.status(400).send({success: false, message: "please provide email"});
          }
          if (!password) {
            return res.status(400).send({success: false, message: "please provide password"});
          }

          const existingUser = await userModel.findOne({email});
          if (existingUser){
            return res.status(400)
            .send({success: false, message: "email already registered"});
          }

          const user = await userModel.create({name, lastname, email, password});
          // token generation
          const token = user.createJWT();
          res.status(201).send({
            success: true,
            message: "user registered successfully",
            user: {
              name: user.name,
              lastname: user.lastname,
              email: user.email,
              location: user.location
            },
            token
          });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "failed user registration",
            error
        });
    }
}


export const loginController = async function(req, res) {
      const {email, password} = req.body;

      if (!email || !password) {
        return res.status(401).send({message:"please provide valid email and password"});
      }

      const user = await userModel.findOne({email}).select("+password");
      if (!user) {
        return res.status(500).send({message: "Invalid userName or password"});
      }

      const isMatched = await user.comparePassword(password);
      if (!isMatched) {
        return res.status(500).send({message: "Invalid username or password"});
      }
    
      const token = user.createJWT();
      user.password = undefined;
      
      res.status(200).json({
        success: true,
        message: "Login successfully",
        user,
        token
      });
}