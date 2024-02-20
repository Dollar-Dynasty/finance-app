const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    title: String,
    description: String,
    targetAmount: Number,
    savedAmount: Number,
    progress: {
        type: Number,
        default: function() {
            return this.savedAmount / this.targetAmount * 100;
        }
    },
    periodicSavings: [{
        amount: Number,
        date: Date
    }],
    deadline: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    accountId: {
        type: String,
        required: true
    },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;