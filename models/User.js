const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ['author','admin'],
        default: 'author',
        require: true
    }
});

userSchema.pre('save', async function(next){
    if(this.isModified('password') || this.isNew){
        const salt = await bcrypt.genSalt(10);
        this.password =  await bcrypt.hash(this.password, salt);
    }
    next();
});

exports.User = mongoose.model('User', userSchema);
