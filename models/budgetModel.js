const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    category: String,
    budgetedAmount: Number,
    actualAmount: {
				type: Number, 
				default: 0 
		},
    startDate: Date,
    endDate: Date,
    accountId: {
        type: String,
        required: true
    },
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;