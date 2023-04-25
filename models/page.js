import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pageSchema = new Schema({
   
    title: {
        type: String
    },
    subTitle: {
        type: String
    },
    description: {
        type: String  
    },
    

    pageStatus: {
        type: String,
        enum: ['draft','published'],
        default: 'draft'
    },
    publishedOn: {
        type: String
    },
    updatedOn: {
        type: String
    },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now() },
})


export default mongoose.model('Page', pageSchema);