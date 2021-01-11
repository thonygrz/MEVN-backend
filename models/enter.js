import mongoose, { mongo, Schema } from "mongoose";

const enterSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "user", required: true },
  person: { type: Schema.ObjectId, ref: "person", required: true },
  proofType: { type: String, maxlength: 20, required: true },
  proofSeries: { type: String, maxlength: 7 },
  proofNumber: { type: String, maxlength: 10, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  details: [
    {
      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const Enter = mongoose.model("enter", enterSchema);

export default Enter;
