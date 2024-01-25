const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,  // User ref
    category: String,
    budgetedAmount: Number,
    actualAmount: {
				type: Number, 
				default: 0 
		},
    startDate: Date,
    endDate: Date
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;