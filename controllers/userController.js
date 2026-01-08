const mongoose = require('mongoose');
const userModel = require('../models/User');

const login = async(req, res) => {
    return res.render('admin/login', {layout: false});
}

const adminLogin = async(req, res) => {
    
}

const dashboard = async(req, res) => {
    return res.render('admin/dashboard');
}

const logout = async(req, res) => {
    
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
    
}

const userUpdate = async(req, res) => {
    
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

const settingsUpdate = async(req, res) => {
    return res.render('admin/settings/update');
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
    settingsUpdate
}
