import mongoose from "mongoose";
const catalogueSchema = new mongoose.Schema({
  title:{
    type:String,required:true
  },
  description: {
    type: String,
    required: true,
  },
  space: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  images:[{
    image_url: { type: String, required: true },
    memoryNote: { type: String, required: false },
    privacy: { type: String, required: true, default: "public", enum: ["public", "private"],}
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Catalogue = mongoose.model('Catalogue', catalogueSchema);

export default Catalogue;
