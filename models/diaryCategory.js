import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const diaryCategorySchema = new Schema({
    title: {
        type: String
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }


})


export default mongoose.model('DiaryCategory', diaryCategorySchema);