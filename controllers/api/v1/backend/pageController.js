import Page from '../../../../models/page.js';
import { DataNotFoundError } from '../errors/errors.js';

const listPage = (req,res,next)=> {
    let user = req.user;
    console.log('User ID : ' +user._id);
    Page.find()
    .then(diaries => {
        res.json({success: true,message: 'Page Data received successfully',data: diaries})
    })

}

const storePage =  (req,res,next)=> {
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description
    const userId = req.user._id

    Page.create({
        updatedBy: userId,
        title: title,
        subTitle: subTitle,
      
        description: description,
        
    }).then(page => {
        res.json({success: true,message: 'Page created successfully',data: page})
    }).catch(err => {
        console.log(err);

    });

}

const showPage = (req,res,next) => {
    console.log('Show Page function called')
    const pageId = req.params.pageId;
    Page.findOne({_id: pageId})
    .then(page => {
        res.json({success: true,message: 'Page Shown Successfully',data: page})
    })
}

const updatePage =  (req,res,next)=> {
    const pageId = req.params.pageId;
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description
    
    Page.findOne({_id: pageId})
    .then ( page => {
        page.title= title
        page.subTitle= subTitle
    
        page.description= description
        
        page.save()
        return page
       
    })

    .then(page => {
        res.json({success: true,message: 'Page Updated Successfully',data: page})
    })



}

const deletePage = (req,res,next)=> {
    const pageId = req.params.pageId;
    Page.deleteOne({_id: pageId})
    .then(() => {
        console.log('DESTROYED Page');
        res.json({success: true,message: 'Page Deleted Successfully',data: {}})
    })
    .catch(err => console.log(err));
}


export { listPage, storePage,showPage,updatePage,deletePage}