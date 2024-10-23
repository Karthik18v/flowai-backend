const express = require("express");
const connectDB = require("./Config/db");
const Transaction = require("./models/Transaction");
const cors = require('cors');

require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//sample testing

app.get("/", async (request, response) => {
  response.send("Hello");
});

//adding transaction

app.post("/transactions", async (request, response) => {
  const { type, category, amount, date, description } = request.body;
  if (!type || !category || !amount) {
    response.status(400).json({ message: "Enter All Details" });
  }

  try {
    const addNewTransaction = await Transaction.create({
      type,
      category,
      amount,
      date,
      description,
    });
    response.status(201).json(addNewTransaction);
  } catch (error) {
    response.status(401).json({ message: error.message });
  }
});

//get all transactions

app.get("/transactions", async (request, response) => {
  try {
    const transactions = await Transaction.find();
    response.status(200).json(transactions);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// get transaction by using id

app.get("/transactions/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      response.status(401).json({ message: "Transaction is not found" });
    }
    response.status(200).json(transaction);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// update transaction using id

app.put("/transactions/:id", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  try {
    const updateTransaction = await Transaction.findByIdAndUpdate(
      id,
      request.body,
      { new: true }
    );
    if (!updateTransaction) {
      response.status(401).json({ message: "Transaction is not found" });
    }
    response.status(200).json(updateTransaction);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

//delete a transaction using id

app.delete("/transactions/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      response.status(401).json({ message: "Transaction is not found" });
    }
    response.status(200).json({ message: "Transaction Successfully Deleted" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

//get summary of transactions

app.get("/summary/", async (request, response) => {
  try {
    const allTransactions = await Transaction.find();
    const totalExpenses = allTransactions
      .filter((eachTransaction) => eachTransaction.type === "expense")
      .reduce((sum, eachTransaction) => sum + eachTransaction.amount, 0);

    const totalIncome = allTransactions
      .filter((eachTransaction) => eachTransaction.type === "income")
      .reduce((sum, eachTransaction) => sum + eachTransaction.amount, 0);

    const balance = allTransactions.reduce(
      (sum, eachTransaction) =>
        eachTransaction.type === "income"
          ? sum + eachTransaction.amount
          : sum - eachTransaction.amount,
      0
    );
    console.log(balance);
    const summary = { totalExpenses, totalIncome, balance };
    response.status(200).json(summary);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});


module.exports = app;

