const express = require('express');
const { getEmployeeById, getEmployees } = require('./controllers');
const app = express();

app.use(express.json());

app.get('/employees', async (req, res) => {
  const employees = getEmployees();
  res.json({ employees });
});

app.get('/employees/details/:id', async (req, res) => {
  const employee = getEmployeeById(parseInt(req.params.id));

  res.json({ employee });
});

module.exports = { app };
