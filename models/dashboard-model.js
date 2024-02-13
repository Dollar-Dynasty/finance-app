const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId, // User ref
    totalBudget: Number,
    totalSpent: Number,
    budgetStatus: [{
        category: String,
        budgetedAmount: Number,
        actualAmount: Number,
        remainingAmount: Number // budgetedAmount - actualAmount
    }],
    financialGoalsProgress: [{
        goalId: mongoose.Schema.Types.ObjectId, // financialGoal ref
        title: String,
        progressPercentage: Number // (savedAmount / targetAmount) * 100
    }],
    upcomingGoalDeadlines: [{
        goalId: mongoose.Schema.Types.ObjectId, // financialGoal ref
        title: String,
        deadline: Date
    }],
    spendingTrends: [{
        category: String,
        monthlySpending: [{ // Monthly spending amounts arr
            month: String,
            amount: Number
        }]
    }]
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;