const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

categorySchema.pre('validate', function () {
    if (this.isModified('name') || !this.slug) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true
        });
    }
});


module.exports = mongoose.model('Category', categorySchema);
