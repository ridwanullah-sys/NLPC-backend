const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const schema = mongoose.Schema;

const adminSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

adminSchema.statics.login = async function (email, password) {
  if (!password) {
    throw Error("password is Required");
  } else if (!email) {
    throw Error("email is Required");
  }

  const admin = await this.findOne({ email });
  if (!admin) {
    throw Error("email not registered");
  }
  const march = await bcrypt.compare(password, admin.password);
  if (!march) {
    throw Error("incorrect Password");
  }
  return admin;
};
module.exports = mongoose.model("admin", adminSchema);
