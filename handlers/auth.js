import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
          const {name, email, password, lastname} = req.body;
          //validations
          if (!name) {
            return res.status(400).send({success: false, message: "please provide name"});
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
          res.status(201).send({
            success: true,
            message: "user registered successfully",
            user
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