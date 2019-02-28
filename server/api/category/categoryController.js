const Category = require('./categoryModel')
const _ = require('lodash')

exports.params = (req, res, next, id) => {
    Category.findById(id)
        .then(category => {
            if(!category){
                next(new Error('No category with id ' + id))
            }
            else {
                req.category = category
                next()
            }
        })
        .catch(error => next(error))
}

exports.get = (req, res, next) => {
    Category.find({})
        .then(categories => res.json(categories))
        .catch(error => next(error))
}

exports.getOne = (req, res, next) => {
    res.json(req.category)
}

exports.put = (req, res, next) => {
    let category = req.category
    let update = req.body
    _.merge(category, update)
    category.save((error, savedCategory) => error ? next(error) : res.json(savedCategory))
}

exports.delete = (req, res, next) => {
    
}
