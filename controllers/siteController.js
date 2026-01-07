const mongoose = require('mongoose');


const index = async(req, res) => {
    return res.render('index');
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