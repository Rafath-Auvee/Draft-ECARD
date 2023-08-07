const { model, models, Schema } = require("mongoose");
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  title: String,
  imageUrl: String,
  watermark: String,
  imageType: String,
  price: Number,
  buttonText: String,
  cardType: String,
  popularity: Number,
  description: String,
  cardCategory: String,
  images: [{
    id: String,
    watermark: String,
    textStyles: [{
      id: String,
      text: String,
      left: Number,
      top: Number,
      startingImage: String,
      width: Number,
      height: Number,
      color: String,
      fontSize: String,
      backgroundColor: String,
      padding: String,
      fontFamily: String,
      textAlign: String,
      lineHeight: Number,
      letterSpacing: Number,
    }],
  }],
  textStyles: [{
    id: String,
    text: String,
    left: Number,
    top: Number,
    startingImage: String,
    width: Number,
    height: Number,
    color: String,
    fontSize: String,
    backgroundColor: String,
    padding: String,
    fontFamily: String,
    textAlign: String,
    lineHeight: Number,
    letterSpacing: Number,
  }],
  userName: String,
  userEmail: String,
  watermarkDefault: { type: Boolean, default: true },
  paid: { type: Boolean, default: false },
});

const OrderModel = models.orders || mongoose.model('orders', orderSchema);

module.exports = OrderModel;
