const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  vehicle: { type: String, default: null },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

expenseSchema.virtual('id').get(function () {
  return this._id.toString();
});

expenseSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('Expense', expenseSchema);
