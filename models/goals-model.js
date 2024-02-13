const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId, // User ref
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
    createdAt: Date
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;