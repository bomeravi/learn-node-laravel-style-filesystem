import Diary from '../../../../../models/diary.js';
import DiaryTag from '../../../../../models/diaryTag.js';
import diaryCategory from '../../../../../models/diaryCategory.js';

const listDiaryTag = (req,res,next)=> {
    let user = req.user;
    console.log('User ID : ' +user._id);
    DiaryTag.find({ userId: user._id })
    .then(diaryTags => {
        res.json({success: true,message: 'Diary Tag received successfully',data: diaryTags})
    }).catch(err => {
        console.log(err);

    });
}

const storeDiaryTag =  (req,res,next)=> {
    console.log('Here')
    const name = req.body.name
    const userId = req.user._id

    DiaryTag.create({
        name: named,
        userId: userId
        
    }).then(diaryTag => {
        res.json({success: true,message: 'Updated Successfully',data: diaryTag})
    }).catch(err => {
        console.log('Here');
        console.log(err);

    });
}

const showDiaryTag = (req,res,next) => {
    const diaryTagId = req.params.diaryTagId;

    console.log(diaryTagId)
    DiaryTag.findOne({_id: diaryTagId, userId: req.user._id})
    .then(diary => {
        res.json({success: true,message: 'Diary Tag shown Successfully',data: diary})
    })
}

const updateDiaryTag =  (req,res,next)=> {
    const diaryTagId = req.params.diaryTagId;
    const title = req.body.title
    console.log(diaryTagId)
    DiaryTag.findOne({_id: diaryTagId, userId: req.user._id})
    .then(diaryTag => {
        diaryTag.title = title
        return diaryTag.save();
    })
    .then(result => {

        res.json({success: true, message: 'Updated Successfully', data: result})
    }).catch(err => {
        console.log(err);

    });

}

const deleteDiaryTag = (req,res,next)=> {
    const diaryTagId = req.params.diaryTagId;
    DiaryTag.deleteOne({_id: diaryTagId, userId:req.user._id})
        .then(() => {
            console.log('DESTROYED DiaryTag');
            res.json({success: true,message: 'DiaryTag Deleted Successfully',data: {}})
        })
        .catch(err => {console.log(err)});
}


export { listDiaryTag, storeDiaryTag,showDiaryTag,updateDiaryTag,deleteDiaryTag}