import User from '../../../../../models/user.js';

const showProfile = (req,res,next)=> {
    const id = req.user._id;
    User.findOne({_id: id})
            .then(user => {
                res.json({'success': true,message: 'User Profile', user: user})
            })
            .catch(err => console.log(err))
    }
    
    
    const updateProfile = (req,res,next)=> {
        const updatedName = req.body.name;
        const updatedUsername = req.body.username;
        const updatedEmail = req.body.email;
        const id = req.user._id;
        User.findOne({_id: id})
            .then(user => {
                if(user){
    
    
                if(updatedName)
                user.name = updatedName;
                if(updatedUsername && user.username !== updatedUsername)
                    user.username = updatedUsername
                if(updatedEmail && user.email !== updatedEmail )
                    user.email = updatedEmail;
                user.save()
                    .then(result => {
                        res.status(200).json({
                            success: true,
                            message: 'Profile Updated Successfully',
                            data: result
                        })
                    })
    
    
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: 'Internal Server Error',
                    })
                }
    
    
    
            })
            .catch(err =>{
                console.log(err)
                res.status(404).json({
                    success: false,
                    message: 'Internal Server Error',
                })
            } )
    
    }
    
    const changePassword = (req, res) => {
        const userId = req.user._id;
        const currentPassword = req.body.currentPassword;
        const password = req.body.password
        User.findOne({ _id: userId }).select('+password')
            .then(user => {
                //console.log(user)
                // req.user = user;
                if(user) {
                    const current_user = user;
                    return user.comparePassword(currentPassword).then(resp => {
                        if (resp) {
                            user.password = password
                            user.save();
                            res.status(200).json({'success': true, message: "Password changed successfully"})
                        } else {
                            res.status(401).json({'success': false, message: 'Current password is wrong'});
                        }
    
                    })
                        .catch(err => console.log(err))
                }
                else {
                    res.status(401).json({'success': false, message: 'Current password is wrong'});
                }
            })
            .catch(err=> console.log(err))
    }
    
    export {showProfile,updateProfile,changePassword}
    