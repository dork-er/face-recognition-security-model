import { Schema, model } from 'mongoose';

const faceSchema = new Schema(
  {
    imageID: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
    features: {
      type: Object, // Store extracted facial features here (e.g., embedding vector)
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Face', faceSchema);
