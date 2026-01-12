const newsModel = require('../models/News');
const categoryModel = require('../models/Category');
const path = require('path');
const fs = require('fs');
const errorMsg = require('../utils/error-message')

const newsIndex = async(req, res) => {
    let news;
    if(req.role === 'admin'){
        news = await newsModel.find().populate('category').populate('author');
    }else{
        news = await newsModel.find({author: req.id}).populate('category').populate('author');
    }
    return res.render('admin/article/index', {news});
}

const newsCreate = async(req, res) => {
    const categories = await categoryModel.find();
    return res.render('admin/article/create', {categories});
}

const newsStore = async(req, res,next) => {
    try{
        const {title, category, content} = req.body;
        const author = req.id;
        // Image upload
        const image = req.file.filename;
        const news = await newsModel.create({title, category, content, author, image});
        if(news){
            return res.redirect('/admin/news');
        }
    }catch(err){
        // return res.status(500).json({message: err.message});
        next(errorMsg(err.message,500))
    }
    
}

const newsEdit = async(req, res, next) => {
    try{
        let news;
        news = await newsModel.findById(req.params.id).populate('category');
        if(!news){
            next(errorMsg('News not found',404))
        }
        //admin check
        if(req.role === 'author'){
            if(req.id !== news.author._id.toString()){
                next(errorMsg('Unauthorized',401))
            }
        }
        const categories = await categoryModel.find();
        
        return res.render('admin/article/update', {news, categories});
    }catch(err){
        next(errorMsg(err.message,500))
    }
}

const newsUpdate = async(req, res, next) => {
    try{
        const news = await newsModel.findById(req.params.id);
        if(!news){
            next(errorMsg('News not found',404))
        }
        //admin check
        if(req.role === 'author'){
            if(req.id !== news.author._id.toString()){
                next(errorMsg('Unauthorized',401))
            }
        }
        news.title = req.body.title;
        news.category = req.body.category;
        news.content = req.body.content;

        // Image upload
        if(req.file){
            // Delete image from uploads
            const filePath = path.join('./public/uploads', news.image)
            fs.unlink(filePath,(err)=>{
                if(err) console.log(err)
            })
            news.image = req.file.filename;
        }
        await news.save();
        return res.redirect('/admin/news');
    }catch(err){
        next(errorMsg(err.message,500))

    }
}

const newsDelete = async(req, res, next) => {
    try{
        const news = await newsModel.findById(req.params.id);
        if(!news){
            next(errorMsg('News not found',404))
        }
        //admin check
        if(req.role === 'author'){
            if(req.id !== news.author._id.toString()){
                next(errorMsg('Unauthorized',401))
            }
        }
        // Delete image from uploads
        const filePath = path.join('./public/uploads', news.image)
        fs.unlink(filePath,(err)=>{
            if(err) console.log(err)
        })
        if(news){
            await newsModel.findByIdAndDelete(req.params.id);
            return  res.json({msg:true});
        }
    }catch(err){
        next(errorMsg(err.message,500))
    }
}


module.exports = {
    newsIndex,
    newsCreate,
    newsStore,
    newsEdit,
    newsUpdate,
    newsDelete
}