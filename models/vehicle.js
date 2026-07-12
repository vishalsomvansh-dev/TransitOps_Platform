const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  plate: { type: String, required: true },
  type: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  capacity: { type: Number, required: true },
  registration: { type: String, required: true },
  status: { type: String, default: 'idle' },
  driver: { type: String, default: null },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

vehicleSchema.virtual('id').get(function () {
  return this._id.toString();
});

vehicleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
