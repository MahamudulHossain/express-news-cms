const categoryModel = require('../models/Category');
const slugify = require('slugify');
const errorMsg = require('../utils/error-message')
const {validationResult} = require('express-validator');

const categoryIndex = async (req, res) => {
    const categories = await categoryModel.find();
    return res.render('admin/category/index', {categories});
}

const categoryCreate = async (req, res) => {
    return res.render('admin/category/create', {errors: []});
}

const categoryStore = async (req, res, next) => { 
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.render('admin/category/create', {errors: result.array()});
    }
    try{
        const category = await categoryModel.create(req.body);
        if(category){
            return res.redirect('/admin/category');
        }
    }catch(err){
        next(errorMsg(err.message,500))
    }
}

const categoryEdit = async (req, res, next) => {
    try{
        const category = await categoryModel.findById(req.params.id);
        if(!category){
            next(errorMsg('Category not found',404))
        }
        return res.render('admin/category/update', {category, errors: []});
    }catch(err){
        next(errorMsg(err.message,500))
    }
}

const categoryUpdate = async (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const category = await categoryModel.findById(req.params.id);
        if(!category){
            next(errorMsg('Category not found',404))
        }
        return res.render('admin/category/update', {category,errors: result.array()});
    }
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
            next(errorMsg('Category not found',404))
        }

        return res.redirect('/admin/category');
    } catch (err) {
        next(errorMsg(err.message,500))
    }
};

const categoryDelete = async (req, res, next) => {
    try{
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        if(category){
            return  res.json({msg:true});
        }
    }catch(err){
        next(errorMsg(err.message,500))
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