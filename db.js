const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ticket-system",
  };

  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected To DB successfully");
  } catch (error) {
    console.error(error, "could not connect to db");
  }
};
