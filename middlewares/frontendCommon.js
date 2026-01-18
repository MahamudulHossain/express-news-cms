const newsModel = require('../models/News');
const categoryModel = require('../models/Category');
const settingModel = require('../models/Setting');

module.exports = async (req, res, next) => {
    const categoryInUse = await newsModel.distinct('category');
    const newsCategory = await categoryModel.find({_id: {$in: categoryInUse}});
    const recentNews = await newsModel.find()
                                    .populate('category',{'name':1,'slug':1})
                                    .sort({createdAt: -1}).limit(5);
    const settings = await settingModel.findOne();
    res.locals.settings = settings;                                     
    res.locals.newsCategory = newsCategory;
    res.locals.recentNews = recentNews;
    next();
}