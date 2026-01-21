const newsModel = require('../models/News');
const categoryModel = require('../models/Category');
const userModel = require('../models/User');
const commentModel = require('../models/Comment');
const paginate = require('../utils/paginate');
const errorMsg = require('../utils/error-message')

const index = async(req, res) => {
    const paginatedNews = await paginate(newsModel, {}, req.query, {
        populate: [
            {path: 'category', select: 'name slug'},
            {path: 'author', select: 'fullname'}
        ]
    });
    // return res.json(paginatedNews);
    return res.render('index', {paginatedNews, urlQuery: req.query});
}

const newsByCategory = async(req, res,next) => {
    const slug = await categoryModel.findOne({slug: req.params.slug});

    if(!slug){
        next(errorMsg('Category not found',404))
    };
    const paginatedNews = await paginate(newsModel, {category: slug._id}, req.query, {
        populate: [
            {path: 'category', select: 'name slug'},
            {path: 'author', select: 'fullname'}
        ]
    })
    return res.render('category', {paginatedNews,slug, urlQuery: req.query});
}

const newsByAuthor = async(req, res,next) => {
    const author = await userModel.findOne({_id:req.params.id});
    if(!author){
        next(errorMsg('Author not found',404))
    };

    const paginatedNews = await paginate(newsModel, {author: author._id}, req.query, {
        populate: [
            {path: 'category', select: 'name slug'},
            {path: 'author', select: 'fullname'}
        ]
    })
    return res.render('author', {paginatedNews,author, urlQuery: req.query});
    
}

const singleNews = async(req, res,next) => {
    const news = await newsModel.findById(req.params.id)
                                .populate('category',{'name':1,'slug':1})
                                .populate('author','fullname');
    if(!news){
        return next(errorMsg('News not found',404))
    };
    
    // fetching approved comments
    const comments = await commentModel.find({news: news._id, status: 'approved'});
    // res.json(comments);
    return res.render('single', {news,comments});
}

const searchNews = async(req,res,next) => {
    const keyword = req.query.search;
    if(!keyword){
        return res.redirect('/');
    }
    
    const paginatedNews = await paginate(newsModel, {$or: [
        {title: {$regex: keyword, $options: 'i'}}, 
        {content: {$regex: keyword, $options: 'i'}}
    ]}, req.query, {
        populate: [
            {path: 'category', select: 'name slug'},
            {path: 'author', select: 'fullname'}
        ]
    });

    if((paginatedNews.docs).length === 0){
        return next(errorMsg('News not found',404))
    };
    return res.render('search', {paginatedNews,keyword, urlQuery: req.query});
}

const addComment = async(req, res) => {
    try {
        const news = await newsModel.findById(req.params.id);
        if(!news){
            return next(errorMsg('News not found',404))
        };

        const comment = await commentModel.create({...req.body, news: news._id});
        return res.redirect(`/single/${req.params.id}`);
    } catch (error) {
        return next(errorMsg(error.message,500))
    }
}

module.exports = {
    index,
    newsByCategory,
    newsByAuthor,
    singleNews,
    searchNews,
    addComment
}