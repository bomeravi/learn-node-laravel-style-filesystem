import Diary from '../../../../../models/diary.js';
import DiaryTag from '../../../../../models/diaryTag.js';
import DiaryCategory from '../../../../../models/diaryCategory.js';
import { DataNotFoundError } from '../../errors/errors.js';

const listDiary = (req,res,next)=> {
    let user = req.user;
    console.log('User ID : ' +user._id);
    Diary.find({ userId: user._id })
    .then(diaries => {
        res.json({success: true,message: 'Diary Data received successfully',data: diaries})
    })



}

const storeDiary =  (req,res,next)=> {
    const title = req.body.title
    const subTitle = req.body.subTitle
    const engDate = req.body.engDate
    const nepDate = req.body.nepDate
    const description = req.body.description
    const categoryId = req.body.categoryId
    const tags = req.body.tags
    const userId = req.user._id

    const categoryName = ''
    DiaryCategory.findById(categoryId)
    .then(result =>{
        if(result.userId == userId){
            categoryName = result.name
        }
        else {
            throw new DataPermissionError('Category not exists')

        }
    })
    .catch(err =>{
        console.log(err)
        throw new DataNotFoundError('Category not exists')
    })

    Diary.create({
        userId: userId,
        title: title,
        subTitle: subTitle,
        engDate: engDate,
        nepDate: nepDate,
        description: description,
        category: {
            categoryId: categoryId,
            name: categoryName
        },
        
        tags: tags
    }).then(diary => {
        res.json({success: true,message: 'Diary created successfully',data: diary})
    }).catch(err => {
        console.log(err);

    });

}

const showDiary = (req,res,next) => {
    console.log('Show Diary function called')
    const diaryId = req.params.diaryId;
    Diary.findOne({_id: diaryId, userId: req.user._id})
    .then(diary => {
        res.json({success: true,message: 'Diary Shown Successfully',data: diary})
    })
}

const updateDiary =  (req,res,next)=> {
    const diaryId = req.params.diaryId;
    const title = req.body.title
    const subTitle = req.body.subTitle
    const engDate = req.body.engDate
    const nepDate = req.body.nepDate
    const description = req.body.description
    const categoryId = req.body.categoryId
    const tags = req.body.tags
    const categoryName = ''
    
    Diary.findOne({_id: diaryId, userId: req.user._id})
        .then ( diary => {
        diary.title= title
        diary.subTitle= subTitle
        diary.engDate= engDate
        diary.nepDate= nepDate
        diary.description= description
        diary.tags= tags
        if(diary.category.categoryId != categoryId){
            DiaryCategory.findById(categoryId)
            .then(result =>{
                if(result.userId == userId){
                    categoryName = result.name
                }
                else {
                    throw new DataPermissionError('Category not exists')

                }
            })
            .catch(err =>{
                console.log(err)
                throw new DataNotFoundError('Category not exists')
            })
            diary.category.categoryId = categoryId
            diary.category.name = categoryName
            
            
            
        }
        diary.save()
        return diary
       
    })

    .then(diary => {
        res.json({success: true,message: 'Diary Updated Successfully',data: diary})
    })



}

const deleteDiary = (req,res,next)=> {
    const diaryId = req.params.diaryId;
    Diary.deleteOne({_id: diaryId, userId:req.user._id})
    .then(() => {
        console.log('DESTROYED Diary');
        res.json({success: true,message: 'Diary Deleted Successfully',data: {}})
    })
    .catch(err => {
        console.log(err)}
        
        );
}


export { listDiary, storeDiary,showDiary,updateDiary,deleteDiary}