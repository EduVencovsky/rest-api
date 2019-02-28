const router = require('express').Router()
const logger = require('../../util/logger')

router.get('/', (req, res) => {
    logger.log({ok: true})
    res.send({ok: true})
})

module.exports = router