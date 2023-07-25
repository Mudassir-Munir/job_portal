import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
       type: String,
       required: [true, "Name is required"]
    },
    lastname: {
      type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "password length should be atleast 6 characters"]
    },
    location: {
        type: String,
        default: "pakistan"
    },
},{timestamps: true});

export default mongoose.model("User", userSchema);