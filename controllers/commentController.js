const mongoose = require('mongoose');

const commentIndex = async(req, res) => {
    return res.render('admin/comments/index');
}

const commentUpdate = async(req, res) => {

}

module.exports = {
    commentIndex,
    commentUpdate
}



