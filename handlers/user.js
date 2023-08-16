import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    const {name, email, phone, lastname} = req.body;

    const user = await userModel.findOne({_id: req.user.userId});
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    if (phone) {
        user.phone = phone
    }
    if (lastname) {
        user.lastname = lastname
    }
    
    await user.save();
    const token = user.createJWT();
    res.status(200).json({
       user,
       token
    });
};