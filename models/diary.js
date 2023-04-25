import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const diarySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now() },
    title: {
        type: String
    },
    subTitle: {
        type: String
    },
    engDate: {
        type: String
    },
    nepDate: {
        type:String
    },
    description: {
        type: String  
    },
    category:{
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'DiaryCategory',
        },
        name: String
    },
    tags: [
        {

            tagId: {
                type: Schema.Types.ObjectId,
                ref: 'DiaryTag',
                required: true
            },
            name: String

        }

    ],

    diaryStatus: {
        type: String,
        enum: ['draft','published'],
        default: 'draft'
    },
})


export default mongoose.model('Diary', diarySchema);