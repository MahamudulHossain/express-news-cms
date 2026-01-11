const newsModel = require('../models/News');
const categoryModel = require('../models/Category');
const path = require('path');
const fs = require('fs');

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

const newsStore = async(req, res) => {
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
        return res.status(500).json({message: err.message});
    }
    
}

const newsEdit = async(req, res) => {
    try{
        let news;
        news = await newsModel.findById(req.params.id).populate('category');
        if(!news){
            return res.status(404).json({message: 'News not found'});
        }
        //admin check
        if(req.role === 'author'){
            if(req.id !== news.author._id.toString()){
                return res.status(401).json({message: 'Unauthorized'});
            }
        }
        const categories = await categoryModel.find();
        
        return res.render('admin/article/update', {news, categories});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const newsUpdate = async(req, res) => {
    try{
        const news = await newsModel.findById(req.params.id);
        if(!news){
            return res.status(404).json({message: 'News not found'});
        }
        //admin check
        if(req.role === 'author'){
            if(req.id !== news.author._id.toString()){
                return res.status(401).json({message: 'Unauthorized'});
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
        return res.status(500).json({message: err.message});
    }
}

const newsDelete = async(req, res) => {
    try{
        const news = await newsModel.findById(req.params.id);
        if(!news){
            return res.status(404).json({message: 'News not found'});
        }
        //admin check
        if(req.role === 'author'){
            if(req.id !== news.author._id.toString()){
                return res.status(401).json({message: 'Unauthorized'});
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
        return res.status(500).json({message: err.message});
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