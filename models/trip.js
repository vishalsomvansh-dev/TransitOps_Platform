const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  vehicle: { type: String, required: true },
  driver: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  passengers: { type: Number, required: true },
  revenue: { type: Number, required: true },
  status: { type: String, default: 'pending' },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

tripSchema.virtual('id').get(function () {
  return this._id.toString();
});

tripSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('Trip', tripSchema);
