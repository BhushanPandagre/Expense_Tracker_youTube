const Expense = require("../models/Expense");

exports.create = async (req, res, next) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount || amount <= 0) {
      return res
        .status(400)
        .json({ message: "title aur sahi amount do" });
    }

    const expense = await Expense.create({
      user: req.userId,
      title,
      amount,
      category,
    });
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const expenses = await Expense.find({
      user: req.userId,
    }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { title, amount, category } = req.body;
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, amount, category },
      { new: true, runValidators: true },
    );

    if (!expense)
      return res
        .status(404)
        .json({ message: "Kharcha nahi mila" });
    res.json(expense);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!expense)
      return res
        .status(404)
        .json({ message: "Kharcha nahi mila" });
    res.json({ message: "Kharcha delete ho gaya" });
  } catch (err) {
    next(err);
  }
};
