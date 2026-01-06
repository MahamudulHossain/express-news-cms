const mongoose = require('mongoose');
const slugify = require('slugify');
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    description:{
        type: String
    },
    slug:{
        type: String,
        require: true,
        unique: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

categorySchema.pre('save', function(next){
    this.slug = slugify(this.name, { lower: true });
    next();
});

exports.Category = mongoose.model('Category', categorySchema);
