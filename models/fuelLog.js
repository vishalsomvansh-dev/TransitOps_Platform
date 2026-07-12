const mongoose = require('mongoose');

const fuelLogSchema = new mongoose.Schema({
  vehicle: { type: String, required: true },
  date: { type: String, required: true },
  liters: { type: Number, required: true },
  cost: { type: Number, required: true },
  mileage: { type: Number, required: true },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

fuelLogSchema.virtual('id').get(function () {
  return this._id.toString();
});

fuelLogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('FuelLog', fuelLogSchema);
