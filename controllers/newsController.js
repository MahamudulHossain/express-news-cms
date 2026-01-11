const newsModel = require('../models/News');
const categoryModel = require('../models/Category');

const newsIndex = async(req, res) => {
    const news = await newsModel.find();
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
    
}

const newsUpdate = async(req, res) => {
    
}

const newsDelete = async(req, res) => {
    
}


module.exports = {
    newsIndex,
    newsCreate,
    newsStore,
    newsEdit,
    newsUpdate,
    newsDelete
}