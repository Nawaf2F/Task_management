const router = require('express').Router()
const controller = require('../Controllers/tasks')
const { check } = require('express-validator/check')


//Home
router.get('/',controller.home)

//show tasks
router.get('/create',controller.create)

//create post request
router.post('/create',[
    check('title').isLength({min: 5}).withMessage('Title should be more than 5 char'),
    check('description').isLength({min: 5}).withMessage('Description should be more than 5 char')],
    controller.createReq)

//update
router.get('/update/:id',controller.edit)
router.put('/update/:id',controller.update)

//delete
router.delete('/delete/:id',controller.delete)

module.exports = router
