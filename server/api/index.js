const router = require('express').Router()
const user = require('./user/userRoutes')
const category = require('./category/categoryRoutes')
const post = require('./post/postRoutes')

router.use('/', (req, res) => res.send('Hello World!'))
router.use('/users', user)
router.use('/categories', category)
router.use('/posts', post)

module.exports = router
