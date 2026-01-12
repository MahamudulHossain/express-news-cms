const mongoose = require('mongoose');
const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const newsModel = require('../models/News');
const categoryModel = require('../models/Category');
const settingModel = require('../models/Setting');
const path = require('path');
const fs = require('fs');

dotenv.config();

const login = async(req, res) => {
    return res.render('admin/login', {layout: false});
}

const adminLogin = async(req, res) => {
    const {username, password} = req.body;
    const user = await userModel.findOne({username});
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched){
        return res.status(401).json({message: 'Invalid Password'});
    }
    const token = jwt.sign({id: user._id, fullname: user.fullname,role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.cookie('token', token, {httpOnly: true, maxAge: 60 * 60 * 1000});
    return res.redirect('/admin/dashboard');
}

const dashboard = async(req, res) => {
    let articleCount = 0;
    let categoryCount = 0;
    let userCount = 0;
    if(req.role === 'admin'){
        articleCount = await newsModel.countDocuments();
        categoryCount = await categoryModel.countDocuments();
        userCount = await userModel.countDocuments();
    }else{
        articleCount = await newsModel.countDocuments({author: req.id});
        userCount = await userModel.countDocuments();
        categoryCount = await categoryModel.countDocuments();
    }
    
    return res.render('admin/dashboard', {articleCount, categoryCount, userCount});
}

const logout = async(req, res) => {
    const token = req.cookies.token;
    if(!token){
        return res.redirect('/admin/login');
    }
    res.clearCookie('token');
    return res.redirect('/admin');
}

const userIndex = async(req, res) => {
    const users = await userModel.find();
    return res.render('admin/user/index', {users});
}

const userCreate = async(req, res) => {
    return res.render('admin/user/create');
}

const userStore = async(req, res) => {
    try{
        const {fullname,username, password, role} = req.body;
        const user = await userModel.create({fullname, username, password, role});
        if(user){
            return res.redirect('/admin/user');
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const userEdit = async(req, res) => {
    try{
        const user = await userModel.findById(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        return res.render('admin/user/update', {user});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const userUpdate = async(req, res) => {
    try{
        const user = await userModel.findById(req.params.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        user.fullname = req.body.fullname;
        user.username = req.body.username;
        if(req.body.password){
            user.password = req.body.password;
        }
        user.role = req.body.role;
        await user.save();
        return res.redirect('/admin/user');
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const userDelete = async(req, res) => {
    try{
        const user = await userModel.findByIdAndDelete(req.params.id);
        if(user){
            return  res.json({msg:true});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    
}

const settingsEdit = async(req, res) => {
    const setting = await settingModel.findOne();
    return res.render('admin/settings/update', {setting});
}

const settingsUpdate = async(req, res) => {
    try{
        const {website_title,footer_description} = req.body;
        // Image upload
        if(req.file){
            const website_logo = req.file.filename;
            await settingModel.updateOne({website_title,website_logo, footer_description});
            return res.redirect('/admin/settings/update');
        }
        await settingModel.updateOne({website_title,footer_description});
        return res.redirect('/admin/settings/update');
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

module.exports = {
    login,
    adminLogin,
    dashboard,
    logout,
    userIndex,
    userCreate,
    userStore,
    userEdit,
    userUpdate,
    userDelete,
    settingsEdit,
    settingsUpdate
}
