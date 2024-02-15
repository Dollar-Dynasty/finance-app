const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  budget_title: {
    type: String,
    required: true,
  },
  budget_description: {
    type: String,
    required: true,
  },
  month_start_date: {
    type: Date,
    required: true,
  },
  month_end_date: {
    type: Date,
    required: true,
  },
  monthly_income: {
    type: String,
    required: true,
  },
  categories: [{
    category_name: {
      type: String,
      required: true,
    },
    category_description: {
      type: String,
      required: true,
    },
    category_budget_allowance: {
      type: String,
      required: true,
    }
  }],
  accountId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;