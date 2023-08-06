import mongoose from "mongoose";

const url = process.env.URI || "mongodb://0.0.0.0:27017/save-the-date";
// process.env.MONGODB_URI || "mongodb://localhost:27017/save-the-date";

// console.log(url);

let connection;

const startDb = async () => {
  if (!connection)
    connection = await mongoose
      .connect(url)
      .then(() => {
        console.log("Connected To DB Sucessfully....");
      })
      .catch((err) => {
        console.log(err);
      });
  // console.log("DATABASE CONNECTED");
  return connection;
};

export default startDb;
