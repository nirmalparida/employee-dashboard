const authCheck = require("../middleware/check-auth");
const Employee = require("../models/employee");

exports.createEmployee = (req, res, next) => {
  const employee = new Employee({
    fullName: req.body.fullName,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    location: req.body.location,
    age: req.body.age,
    salary: req.body.salary,
  });
  employee
    .save()
    .then((createdEmployee) => {
      res.status(201).json({
        message: "Employee added successfully",
        post: {
          ...createdEmployee,
          id: createdEmployee._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating an Employee failed!",
      });
    });
};

exports.getEmployees = (req, res, next) => {
  const employeeQuery = Employee.find();
  let fetchedEmployees;

  employeeQuery
    .then(() => {
      res.status(200).json({
        message: "employees fetched succesfully",
        employees: fetchedEmployees,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching posts failed!",
      });
    });
};

exports.getEmployee = (req, res, next) => {
  Employee.findById(req.params.id)
    .then((employee) => {
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching employee failed!",
      });
    });
};

exports.updateEmployees = (req, res, next) => {
  const employee = new Employee({
    _id: req.body.id,
    fullName: req.body.fullName,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    location: req.body.location,
    age: req.body.age,
    salary: req.body.salary,
  });
  Employee.updateOne({ _id: req.params.id }, employee)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res
          .status(401)
          .json({ message: "Not Authorized to update the Employee" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Update Employee failed!",
      });
    });
};

exports.deleteEmployees = (req, res, next) => {
  Employee.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(201).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "deleting an Employee failed!",
      });
    });
};
