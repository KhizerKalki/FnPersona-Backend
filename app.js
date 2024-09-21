const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routers/authRouter");
const assetsRouter = require("./routers/assetsRouter");
const budgetOverviewRouter = require("./routers/budgetOverviewRouter");
const contributionRouter = require("./routers/contributionRouter");
const fireCalculatorRouter = require("./routers/fireCalculatorRouter");
const goalRouter = require("./routers/goalRouter");
const investmentsRouter = require("./routers/investmentsRouter");
const netWorthRouter = require("./routers/netWorthRouter");
const notificationRouter = require("./routers/notificationRouter");
const recurringExpensesRouter = require("./routers/recurringExpensesRouter");
const transactionsRouter = require("./routers/transactionsRouter");
const upcomingExpensesRouter = require("./routers/upcomingExpensesRouter");
const userGrowthRouter = require("./routers/userGrowthRouter");
const userSettingsRouter = require("./routers/userSettingsRouter");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/user", authRouter);
app.use("/assets-liabilities", assetsRouter);
app.use("/budget-overview", budgetOverviewRouter);
app.use("/contribution", contributionRouter);
app.use("/fireCalculator", fireCalculatorRouter);
app.use("/goal", goalRouter);
app.use("/investments", investmentsRouter);
app.use("/netWorth", netWorthRouter);
app.use("/notification", notificationRouter);
app.use("/recurring-expenses", recurringExpensesRouter);
app.use("/transactions", transactionsRouter);
app.use("/upcoming-expenses", upcomingExpensesRouter);
app.use("/user-growth", userGrowthRouter);
app.use("/user-settings", userSettingsRouter);

module.exports = app;
