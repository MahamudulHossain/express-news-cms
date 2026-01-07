const mongoose = require('mongoose');

const newsIndex = async(req, res) => {
    return res.render('admin/article/index');
}

const newsCreate = async(req, res) => {
    return res.render('admin/article/create');
}

const newsStore = async(req, res) => {
    
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