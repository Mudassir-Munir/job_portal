import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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
        minlength: [6, "password length should be atleast 6 characters"],
        select: true,
    },
    location: {
        type: String,
        default: "pakistan"
    },
},{timestamps: true});
// middleware
userSchema.pre("save", async function () {
   if (!this.isModified("password")) return;
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

// jwt token
userSchema.methods.createJWT = function () {
    return JWT.sign({userId: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
};

// compare password
userSchema.methods.comparePassword = async function (userPassword) {
const isMatch = await bcrypt.compare(userPassword, this.password);
return isMatch;
};

export default mongoose.model("User", userSchema);