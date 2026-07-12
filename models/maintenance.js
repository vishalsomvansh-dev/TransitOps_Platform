const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  vehicle: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  cost: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  notes: { type: String, default: '' },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

maintenanceSchema.virtual('id').get(function () {
  return this._id.toString();
});

maintenanceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
