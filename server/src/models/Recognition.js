import { Schema, model } from 'mongoose';

const recognitionSchema = new Schema({
  faceID: {
    type: Schema.Types.ObjectId,
    ref: 'Face',
    required: true,
  },
  imageID: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  recognizedAs: {
    type: String,
    required: true,
  },
  confidentScore: {
    type: Number,
    required: true,
  },
  recognitionTime: {
    type: Date,
    default: Date.now,
  },
});

export default model('Recognition', recognitionSchema);
