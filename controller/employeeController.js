/* const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
}; */
const Employee = require("../model/Employee");

const getAllEmployee = async (req, res) => {
  // res.json(data.employees);
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "No employee exists." });
  res.json(employees);
};

const createEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "Firstname and lastname required." });
  }
  const result = await Employee.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  res.status(201).json(result);
  /* const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First name and last name required." });
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees); */
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID required." });
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  /* const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  ); */
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No Employee matches the ID ${req.body.id}` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  /* const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  ); */
  // res.json(data.employees);
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  /* const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  ); */
  if (!req?.body?.id)
    return res.status(400).json({ message: "Employee ID required." });
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No Employee matches the ID ${req.body.id}` });
  }
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result);
  /* const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]);  
  res.json(data.employees); */
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Employee ID required." });
  /* const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  ); */
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No Employee matches the ID ${req.body.id}` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployee,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
