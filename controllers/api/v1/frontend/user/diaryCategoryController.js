import Diary from '../../../../../models/diary.js';
import DiaryTag from '../../../../../models/diaryTag.js';
import DiaryCategory from '../../../../../models/diaryCategory.js';
import diaryCategory from '../../../../../models/diaryCategory.js';

const listDiaryCategory = (req,res,next)=> {
    let user = req.user;
    console.log('User ID : ' +user._id);
    DiaryCategory.find({ userId: user._id })
    .then(diaryCategories => {
        res.json({success: true,message: 'Diary Category received successfully',data: diaryCategories})
    }).catch(err => {
        console.log(err);

    });
}

const storeDiaryCategory =  (req,res,next)=> {
    console.log('Here')
    const title = req.body.title
    const userId = req.user._id

    DiaryCategory.create({
        title: title,
        userId: userId
        
    }).then(diaryCategory => {
        res.json({success: true,message: 'Updated Successfully',data: diaryCategory})
    }).catch(err => {
        console.log('Here');
        console.log(err);

    });
}

const showDiaryCategory = (req,res,next) => {
    const diaryCategoryId = req.params.diaryCategoryId;
    console.log(diaryCategoryId)
    DiaryCategory.findOne({_id: diaryCategoryId, userId: req.user._id})
    .then(diary => {
        res.json({success: true,message: 'Diary Category shown Successfully',data: diary})
    })
}

const updateDiaryCategory =  (req,res,next)=> {
    const diaryCategoryId = req.params.diaryCategoryId;
    const title = req.body.title
    console.log(diaryCategoryId)
    DiaryCategory.findOne({_id: diaryCategoryId, userId: req.user._id})
    .then(diaryCategory => {
        diaryCategory.title = title
        return diaryCategory.save();
    })
    .then(result => {

        res.json({success: true, message: 'Updated Successfully', data: result})
    }).catch(err => {
        console.log(err);

    });

}

const deleteDiaryCategory = (req,res,next)=> {
    const diaryCategoryId = req.params.diaryCategoryId;
    DiaryCategory.deleteOne({_id: diaryCategoryId, userId:req.user._id})
        .then(() => {
            console.log('DESTROYED DiaryCategory');
            res.json({success: true,message: 'DiaryCategory Deleted Successfully',data: {}})
        })
        .catch(err => {console.log(err)});
}


export { listDiaryCategory, storeDiaryCategory,showDiaryCategory,updateDiaryCategory,deleteDiaryCategory}