const mongoose = require('mongoose');

const newsModel = mongoose.model('../models/News');
const categoryModel = mongoose.model('../models/Category');
const userModel = mongoose.model('../models/User');

const index = async(req, res) => {
    
}

const newsByCategory = async(req, res) => {
    
}

const newsByAuthor = async(req, res) => {
    
}

const singleNews = async(req, res) => {
    
}

const searchNews = async(req, res) => {
    
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