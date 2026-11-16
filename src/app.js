const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/auth.routes");
const expenseRoutes = require("./routes/expense.routes");
const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
// 100 requests / minute, uske baad 429
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
