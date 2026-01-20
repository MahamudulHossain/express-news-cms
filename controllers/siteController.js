const newsModel = require('../models/News');
const categoryModel = require('../models/Category');
const userModel = require('../models/User');
const commentModel = require('../models/Comment');
const paginate = require('../utils/paginate');
const { query } = require('express-validator');

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

const newsByCategory = async(req, res) => {
    const slug = await categoryModel.findOne({slug: req.params.slug});

    if(!slug){
        return res.status(400).json({message: 'Category not found'});
    };
    const paginatedNews = await paginate(newsModel, {category: slug._id}, req.query, {
        populate: [
            {path: 'category', select: 'name slug'},
            {path: 'author', select: 'fullname'}
        ]
    })
    return res.render('category', {paginatedNews,slug, urlQuery: req.query});
}

const newsByAuthor = async(req, res) => {
    const author = await userModel.findOne({_id:req.params.id});
    if(!author){
        return res.status(400).json({message: 'Author not found'});
    };

    const paginatedNews = await paginate(newsModel, {author: author._id}, req.query, {
        populate: [
            {path: 'category', select: 'name slug'},
            {path: 'author', select: 'fullname'}
        ]
    })
    return res.render('author', {paginatedNews,author, urlQuery: req.query});
    
}

const singleNews = async(req, res) => {
    const news = await newsModel.findById(req.params.id)
                                .populate('category',{'name':1,'slug':1})
                                .populate('author','fullname');
    if(!news){
        return res.status(400).json({message: 'News not found'});
    };
    
    // fetching approved comments
    const comments = await commentModel.find({news: news._id, status: 'approved'});
    // res.json(comments);
    return res.render('single', {news,comments});
}

const searchNews = async(req, res) => {
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
    return res.render('search', {paginatedNews,keyword, urlQuery: req.query});
}

const addComment = async(req, res) => {
    try {
        const news = await newsModel.findById(req.params.id);
        if(!news){
            return res.status(400).json({message: 'News not found'});
        };

        const comment = await commentModel.create({...req.body, news: news._id});
        return res.redirect(`/single/${req.params.id}`);
    } catch (error) {
        return res.status(500).json({message: error.message});
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