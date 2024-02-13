const Budget = require('../models/budget-model');

exports.createBudget = async (req, res) => {
  try {
    const {
      budget_title,
      budget_description,
      month_start_date,
      month_end_date,
      monthly_income,
      categories // This should come from the form as an array of category objects
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
    
    // Redirect to a success page or send a success response
    res.redirect('/user-dashboard');
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(500).send(error.message);
  }
};