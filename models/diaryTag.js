import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const diaryTagSchema = new Schema({
    name: {
        type: String
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }

})


export default mongoose.model('DiaryTag', diaryTagSchema);