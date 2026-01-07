const mongoose = require('mongoose');

const categoryIndex = async (req, res) => {
    return res.render('admin/category/index');
}

const categoryCreate = async (req, res) => {
    return res.render('admin/category/create');
}

const categoryStore = async (req, res) => { 

}

const categoryEdit = async (req, res) => {
    
}

const categoryUpdate = async (req, res) => {
    
}

const categoryDelete = async (req, res) => {
    
}

module.exports = {
    categoryIndex,
    categoryCreate,
    categoryStore,
    categoryEdit,
    categoryUpdate,
    categoryDelete
}