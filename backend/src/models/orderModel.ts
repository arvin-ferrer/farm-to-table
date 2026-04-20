import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  orderQuantity: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: Number,
    required: true,
    enum: [0, 1, 2],
  },
  email: {
    type: String,
    required: true,
  },
  dateOrdered: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
