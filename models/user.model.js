const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [50, "First name must be at most 50 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
      maxlength: [50, "Last name must be at most 50 characters long"],
    },
    
  },
  email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
      maxlength: [100, "Email must be at most 100 characters long"],
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password:{
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [100, "Password must be at most 100 characters long"],
        select: false, // Do not return password in queries
    },
    socketId:{                    
        type: String,
        required: false,
        default: null,
    }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}   

userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

