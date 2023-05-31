const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const schema = mongoose.Schema;

const employeeSchema = new schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    position: {
      type: String,
      required: true,
    },
    earnings: {
      type: Object,
      require: true,
    },
    deduction: {
      type: Object,
      required: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

employeeSchema.statics.Add = async function (
  firstname,
  lastname,
  position,
  earnings,
  deduction,
  email,
  password
) {
  if (!firstname) {
    throw Error("firstname is Required");
  } else if (!lastname) {
    throw Error("lastname is Required");
  } else if (!position) {
    throw Error("position is Required");
  } else if (!earnings) {
    throw Error("earnings is Required");
  } else if (!deduction) {
    throw Error("deduction is Required");
  } else if (!password) {
    throw Error("password is Required");
  } else if (!email) {
    throw Error("email is Required");
  }

  const employee = await this.findOne({ email });
  if (employee) {
    throw Error("email is registered");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newEmployee = await this.create({
    firstname,
    lastname,
    position,
    earnings,
    deduction,
    email,
    password: hash,
  });
  console.log(newEmployee);
  return newEmployee;
};

employeeSchema.statics.login = async function (email, password) {
  if (!password) {
    throw Error("password is Required");
  } else if (!email) {
    throw Error("email is Required");
  }

  const employee = await this.findOne({ email });
  if (!employee) {
    throw Error("email not registered");
  }
  const march = await bcrypt.compare(password, employee.password);
  if (!march) {
    throw Error("incorrect Password");
  }
  return employee;
};

employeeSchema.statics.edit = async function (_id, DorE, key, value) {
  if (!_id) {
    throw Error("_id is Required");
  } else if (!DorE) {
    throw Error("DorE is Required");
  } else if (!key) {
    throw Error("key is Required");
  }
  if (!validator.isAlpha(DorE) || !validator.isAlpha(key)) {
    throw Error("Wrong DorE or Wrong Key");
  }
  const object = {};
  const concat = `${DorE}.${key}`;
  object[concat] = value;
  const update = await this.findOneAndUpdate({ _id }, object);
  return update;
};

module.exports = mongoose.model("employee", employeeSchema);
