import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  DateUploaded: { type: Date, default: Date.now },
  MediaData: { type: Buffer, required: true }, // Store binary data here
});

export default model('Image', imageSchema);
