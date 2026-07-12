const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');
const Driver = require('../models/driver');
const Trip = require('../models/trip');
const Maintenance = require('../models/maintenance');
const FuelLog = require('../models/fuelLog');
const Expense = require('../models/expense');

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Vehicles
router.get('/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});
router.post('/vehicles', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  await vehicle.save();
  res.status(201).json(vehicle);
});
router.delete('/vehicles/:id', async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Drivers
router.get('/drivers', async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
});
router.post('/drivers', async (req, res) => {
  const driver = new Driver(req.body);
  await driver.save();
  res.status(201).json(driver);
});
router.delete('/drivers/:id', async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Trips
router.get('/trips', async (req, res) => {
  const trips = await Trip.find();
  res.json(trips);
});
router.post('/trips', async (req, res) => {
  const trip = new Trip(req.body);
  await trip.save();
  res.status(201).json(trip);
});
router.put('/trips/:id', async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(trip);
});
router.delete('/trips/:id', async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Maintenance
router.get('/maintenance', async (req, res) => {
  const maintenance = await Maintenance.find();
  res.json(maintenance);
});
router.post('/maintenance', async (req, res) => {
  const maintenance = new Maintenance(req.body);
  await maintenance.save();
  res.status(201).json(maintenance);
});
router.put('/maintenance/:id', async (req, res) => {
  const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(maintenance);
});
router.delete('/maintenance/:id', async (req, res) => {
  await Maintenance.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Fuel logs
router.get('/fuel-logs', async (req, res) => {
  const fuelLogs = await FuelLog.find();
  res.json(fuelLogs);
});
router.post('/fuel-logs', async (req, res) => {
  const fuelLog = new FuelLog(req.body);
  await fuelLog.save();
  res.status(201).json(fuelLog);
});
router.delete('/fuel-logs/:id', async (req, res) => {
  await FuelLog.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Expenses
router.get('/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});
router.post('/expenses', async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.status(201).json(expense);
});
router.delete('/expenses/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Dashboard metrics
router.get('/dashboard', async (req, res) => {
  const totalVehicles = await Vehicle.countDocuments();
  const activeVehicles = await Vehicle.countDocuments({ status: 'active' });
  const activeTrips = await Trip.countDocuments({ status: 'active' });
  const totalDrivers = await Driver.countDocuments();
  const revenue = await Trip.aggregate([{ $group: { _id: null, total: { $sum: '$revenue' } } }]);
  const fuelCost = await FuelLog.aggregate([{ $group: { _id: null, total: { $sum: '$cost' } } }]);
  const expenses = await Expense.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]);
  const maintenanceCount = await Maintenance.countDocuments({ status: { $ne: 'completed' } });

  res.json({
    totalVehicles,
    activeVehicles,
    activeTrips,
    totalDrivers,
    revenue: revenue[0]?.total || 0,
    fuelCost: fuelCost[0]?.total || 0,
    expenses: expenses[0]?.total || 0,
    maintenanceCount,
  });
});

module.exports = router;
