//modules
require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

const connection = require("./db");

// models
const Ticket = require("./models/ticket");

// Database
connection();

// middleware
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT,PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  return res.status(200);
});

/** GET all tickets */
app.get("/api/tickets", async (req, res) => {
  try {
    res.send(await Ticket.find());
  } catch (error) {
    res.status(500).send({ message: "Could not retrieve tickets" });
  }
});

/** GET a single ticket */
app.get("/api/tickets/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);
    res.send(ticket);
  } catch (error) {
    res.status(500).send({ message: "Can not find ticket" });
  }
});

/** PUT update a tickets status and response */
app.put("/api/tickets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      { _id: id },
      { status, response }
    );
    res.send(ticket);
  } catch (error) {
    res.status(500).send({ message: "Can not update ticket" });
  }
});

/** POST create a ticket */
app.post("/api/tickets", async (req, res) => {
  try {
    const { name, email, description } = req.body;

    const newTicket = await new Ticket({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      description,
      status: "new",
    });
    await newTicket.save();

    res.status(201).send({ message: "Ticket created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Could not create new ticket" });
  }
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
