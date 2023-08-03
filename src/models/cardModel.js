const { model, models, Schema } = require("mongoose");
const mongoose = require("mongoose");

const textStyleSchema = new mongoose.Schema({
  id: {
    type: Number,
    // Remove unique constraint
  },
  text: String,
  startingImage: String,
  left: Number,
  top: Number,
  color: String,
  fontSize: String,
  backgroundColor: String,
  fontFamily: String,
  textAlign: String,
  lineHeight: Number,
  // ... add any other properties you have in the textStyle object
});

const cardDataSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      // Remove unique constraint
    },
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
    textStyles: [textStyleSchema],
  },
  {
    strict: false, // Allow additional fields
  }
);

const CardModel = models.card || mongoose.model("card", cardDataSchema);

module.exports = CardModel;
