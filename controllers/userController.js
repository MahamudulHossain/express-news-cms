const mongoose = require('mongoose');


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
    return res.render('admin/user/index');
}

const userCreate = async(req, res) => {
    return res.render('admin/user/create');
}

const userStore = async(req, res) => {
    
}

const userEdit = async(req, res) => {
    
}

const userUpdate = async(req, res) => {
    
}

const userDelete = async(req, res) => {
    
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
