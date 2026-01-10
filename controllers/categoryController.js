const categoryModel = require('../models/Category');
const slugify = require('slugify');
const categoryIndex = async (req, res) => {
    const categories = await categoryModel.find();
    return res.render('admin/category/index', {categories});
}

const categoryCreate = async (req, res) => {
    return res.render('admin/category/create');
}

const categoryStore = async (req, res) => { 
    try{
        const category = await categoryModel.create(req.body);
        if(category){
            return res.redirect('/admin/category');
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const categoryEdit = async (req, res) => {
    try{
        const category = await categoryModel.findById(req.params.id);
        if(!category){
            return res.status(404).json({message: 'Category not found'});
        }
        return res.render('admin/category/update', {category});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const categoryUpdate = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name, {
                lower: true,
                strict: true
            });
        }

        const category = await categoryModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.redirect('/admin/category');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const categoryDelete = async (req, res) => {
    try{
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        if(category){
            return  res.json({msg:true});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    
}

module.exports = {
    categoryIndex,
    categoryCreate,
    categoryStore,
    categoryEdit,
    categoryUpdate,
    categoryDelete
}