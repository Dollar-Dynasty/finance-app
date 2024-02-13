const Budget = require('../models/budget-model');

exports.createBudget = async (req, res) => {
  try {
    const {
      budget_title,
      budget_description,
      month_start_date,
      month_end_date,
      monthly_income,
      categories
    } = req.body;

    const newBudget = await Budget.create({
      budget_title,
      budget_description,
      month_start_date,
      month_end_date,
      monthly_income,
      categories
    });
    newBudget.save();
  
    res.redirect('/goals-form');
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(500).send(error.message);
  }
};