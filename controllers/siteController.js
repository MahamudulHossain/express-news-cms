const newsModel = require('../models/News');
const categoryModel = require('../models/Category');

const index = async(req, res) => {
    const news = await newsModel.find()
                                .populate('category',{'name':1,'slug':1})
                                .populate('author','fullname');
    const categoryInUse = await newsModel.distinct('category');
    const newsCategory = await categoryModel.find({_id: {$in: categoryInUse}});                               
    return res.render('index', {news, newsCategory});
}

const newsByCategory = async(req, res) => {
   
}

const newsByAuthor = async(req, res) => {
    
}

const singleNews = async(req, res) => {
    
}

const searchNews = async(req, res) => {
    
}

const addComment = async(req, res) => {
    
}

module.exports = {
    index,
    newsByCategory,
    newsByAuthor,
    singleNews,
    searchNews,
    addComment
}