const commentModel = require('../models/Comment');
const newsModel = require('../models/News');

const commentIndex = async(req, res) => {
    let comments;
    if(req.role === 'admin'){
        comments = await commentModel.find().populate('news','content');
    }else{
        const news = await newsModel.findById(req.id);

        const newsIds = news?.map(news => news._id.toString());
        comments = await commentModel.find({news: {$in: newsIds}}).populate('news');
    }
    // res.json(comments);
    return res.render('admin/comments/index', {comments});
}

const commentUpdate = async(req, res) => {

}

const commentDelete = async(req, res) => {

}

module.exports = {
    commentIndex,
    commentUpdate,
    commentDelete
}



