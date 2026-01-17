const newsModel = require('../models/News');
const categoryModel = require('../models/Category');
const userModel = require('../models/User');

const index = async(req, res) => {
    const news = await newsModel.find()
                                .populate('category',{'name':1,'slug':1})
                                .populate('author','fullname')
                                .sort({createdAt: -1});
    const categoryInUse = await newsModel.distinct('category');
    const newsCategory = await categoryModel.find({_id: {$in: categoryInUse}});                               
    return res.render('index', {news, newsCategory});
}

const newsByCategory = async(req, res) => {
    const slug = await categoryModel.findOne({slug: req.params.slug});

    if(!slug){
        return res.status(400).json({message: 'Category not found'});
    };
   const news = await newsModel.find({category: slug._id})
                                .populate('category',{'name':1,'slug':1})
                                .populate('author','fullname')
                                .sort({createdAt: -1});
    const categoryInUse = await newsModel.distinct('category');
    const newsCategory = await categoryModel.find({_id: {$in: categoryInUse}});                               
    return res.render('category', {news, newsCategory,slug});
}

const newsByAuthor = async(req, res) => {
    const author = await userModel.findOne({_id:req.params.id});
    if(!author){
        return res.status(400).json({message: 'Author not found'});
    };
   const news = await newsModel.find({author: author._id})
                                .populate('category',{'name':1,'slug':1})
                                .populate('author','fullname')
                                .sort({createdAt: -1});
    const categoryInUse = await newsModel.distinct('category');
    const newsCategory = await categoryModel.find({_id: {$in: categoryInUse}});                               
    return res.render('author', {news, newsCategory,author});
    
}

const singleNews = async(req, res) => {
    const news = await newsModel.findById(req.params.id)
                                .populate('category',{'name':1,'slug':1})
                                .populate('author','fullname');
    if(!news){
        return res.status(400).json({message: 'News not found'});
    };
    const categoryInUse = await newsModel.distinct('category');
    const newsCategory = await categoryModel.find({_id: {$in: categoryInUse}});                               
    return res.render('single', {news, newsCategory});
}

const searchNews = async(req, res) => {
    const keyword = req.query.search;
    const news = await newsModel.find({$or: [
                                        {title: {$regex: keyword, $options: 'i'}}, 
                                        {content: {$regex: keyword, $options: 'i'}}
                                    ]})
                                .populate('category',{'name':1,'slug':1})
                                .populate('author','fullname')
                                .sort({createdAt: -1});
    const categoryInUse = await newsModel.distinct('category');
    const newsCategory = await categoryModel.find({_id: {$in: categoryInUse}});                               
    return res.render('search', {news, newsCategory,keyword});
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