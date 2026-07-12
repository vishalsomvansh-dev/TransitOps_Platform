const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  license: { type: String, required: true },
  licenseExp: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: 'active' },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

driverSchema.virtual('id').get(function () {
  return this._id.toString();
});

driverSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('Driver', driverSchema);
