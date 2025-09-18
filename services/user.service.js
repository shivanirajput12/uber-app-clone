const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("Missing required fields: firstname, email, or password");
  }
  const user = userModel.create({
    fullName: {
      firstname,
      lastname: lastname || null,
    },
    email,
    password,
  });
  return user;
};
