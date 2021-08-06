const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const EmployeesControllers = require("../controllers/employees");

router.post("/", checkAuth, EmployeesControllers.createEmployee);

router.get("/", EmployeesControllers.getEmployees);

router.get("/:empId", EmployeesControllers.getEmployee);

router.put("/:empId", checkAuth, EmployeesControllers.updateEmployees);

router.delete("/:empId", checkAuth, EmployeesControllers.deleteEmployees);

module.exports = router;
