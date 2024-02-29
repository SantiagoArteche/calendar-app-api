import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    notes: { type: String },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

eventSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const eventModel = model("event", eventSchema);
