const express = require("express");
const {
  addUser,
  loginUser,
  editUser,
  deleteUser,
  admin,
  getAllEmployee,
} = require("../controllers/employeeController");
const verifyAuth = require("../middleware/requireAuth");
const router = express.Router();

router.post("/worker", loginUser);
router.post("/employer", admin);

router.get("/", getAllEmployee);
router.post("/addUser", addUser);
router.patch("/:_id", editUser);
router.delete("/:_id", deleteUser);
module.exports = router;
