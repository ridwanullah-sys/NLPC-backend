const employeeModel = require("../models/employeeModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

const createToken = async (_id, usertype) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await employeeModel.login(email, password);
    const token = await createToken(employee._id);
    res.status(200).json({ employee, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getAllEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.find({});
    res.status(200).json({ employee });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getEmployee = async (req, res) => {
  const { _id } = req.params;
  try {
    const employee = await employeeModel.findOne({ _id });
    res.status(200).json({ employee });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const addUser = async (req, res) => {
  const {
    firstname,
    lastname,
    position,
    earnings,
    deduction,
    email,
    password,
  } = req.body;

  try {
    const employee = await employeeModel.Add(
      firstname,
      lastname,
      position,
      earnings,
      deduction,
      email,
      password
    );
    res.status(200).json({ employee, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const editUser = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "invalid Id,19" });
  }
  const { DorE, key, value } = req.body;
  try {
    const employee = await employeeModel.edit(_id, DorE, key, value);
    res.status(200).json({ employee });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "invalid Id,19" });
  }
  try {
    const employee = await employeeModel.findOneAndDelete({ _id });
    res.status(200).json({ employee });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const admin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.login(email, password);
    const employee = await employeeModel.find({});
    const token = await createToken(admin._id);
    res.status(200).json({ employee, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
module.exports = {
  addUser,
  loginUser,
  editUser,
  deleteUser,
  getAllEmployee,
  admin,
  getEmployee,
};
