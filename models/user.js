import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true,'Please Provide Full Name']
    },
    username: {
        type: String,
        required:[true,'Please provide username'],
        minLength: 3,
        maxlength: 20,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxlength: 30,
        unique: true,
    },
    email_is_verified : {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        default: 'password',
        required: [false,'Please provide password'],
        minLength: 3,
        maxlength: 30,
        select: false
    }
});



userSchema.pre('save',async function(){
    //console.log(this.password)
    // console.log(this.modifiedPaths())

    if(!this.isModified('password')) return
    // if(this.isModified('password')){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    //}


})
userSchema.methods.comparePassword =  function (candidatePassword)  {

    const isMatch =  bcrypt.compare(candidatePassword,this.password)
    return isMatch

}


export default mongoose.model('User', userSchema);