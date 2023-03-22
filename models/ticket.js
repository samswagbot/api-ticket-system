const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true,
    },
    response: [String],
    description: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    status: String,
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
