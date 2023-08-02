const { model, models, Schema } = require("mongoose");
const mongoose = require("mongoose");

const textStyleSchema = new mongoose.Schema(
  {
    id: Number,
    type: { type: String, enum: ["text", "image"] },
    left: Number,
    top: Number,
    color: String,
    fontSize: String,
    backgroundColor: String,
    fontFamily: String,
    textAlign: String,
    lineHeight: Number,
    // Add more fields here if needed in the future
  },
  { _id: false }
); // Set _id to false to avoid generating subdocument IDs

const cardSchema = new mongoose.Schema({
  id: Number,
  title: String,
  imageUrl: String,
  referenceImage: String,
  finalImage: String,
  watermark: String,
  imageType: String,
  price: Number,
  buttonText: String,
  cardType: String,
  popularity: Number,
  description: String,
  cardCategory: String,
  textStyles: [textStyleSchema], // Using the textStyleSchema as an array field
  // Add more fields here if needed in the future
});

// Step 3: Create the Mongoose model using the defined schemas
const CardModel = models.card || mongoose.model("Card", cardSchema);

module.exports = CardModel;
