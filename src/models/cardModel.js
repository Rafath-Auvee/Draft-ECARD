const { model, models, Schema } = require("mongoose");
const mongoose = require("mongoose");

const textStyleSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  text: {
    type: String,
    required: function () {
      return !this.startingImage; // Text is required if startingImage is not present
    },
  },
  startingImage: {
    type: String,
    required: function () {
      return !this.text; // Starting image is required if text is not present
    },
  },
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

// Middleware to generate a new id only if it doesn't exist
textStyleSchema.pre("save", function (next) {
  if (!this.id) {
    // Generate a new id only if it doesn't exist
    this.id = new Date().getTime();
  }
  next();
});

const cardDataSchema = new mongoose.Schema({
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
  textStyles: [textStyleSchema],
});

const CardModel = models.card || mongoose.model("card", cardDataSchema);

module.exports = CardModel;
