const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const newsSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    content:{
        type: String,
        require: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    image:{
        type: String,
        require: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

newsSchema.plugin(paginate);

exports.News = mongoose.model('News', newsSchema);
