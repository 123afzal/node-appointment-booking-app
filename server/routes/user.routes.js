const express = require('express');
const {check, param} = require('express-validator');
const {wrap} = require('../middlewares/asycn.error.handler');

const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');

const router = express.Router();

//INSERT SLOTS
router.post('/addSlot',
    [
        check('from').not().isEmpty().withMessage('Please provide a starting time'),
        check('to').not().isEmpty().withMessage('Please provide a ending time'),
        check('user_id').not().isEmpty().withMessage('user id is required'),
    ],
    validate, wrap(userController.insertSlot));

//GET AVAILABLE SLOTS
router.get('/getSlots/:supplier_id',
    [
        param('supplier_id').not().isEmpty().withMessage('Supplier id is required.'),
    ],
    validate, wrap(userController.availableSupplierSlots));

//BOOK APPOINTMENT
router.post('/appointment', [
    check('slot_id').not().isEmpty().isMongoId().withMessage('slot_id is required.'),
    check('supplier_id').not().isEmpty().isMongoId().withMessage('supplier_id is required.')
], validate, wrap(userController.bookAppointment));

//UPDATE APPOINTMENT
router.put('/appointment', [
    check('status').not().isEmpty().withMessage('status is required.'),
    check('id').not().isEmpty().isMongoId().withMessage('id is required.')
], validate, wrap(userController.updateAppointment));

module.exports = router;
