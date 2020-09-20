const mongoose = require('mongoose');
const drConsController = require('../controllers/dr-cons-controller')

const express = require('express')

const router = express.Router();

console.log('in routes')

router.get('/users/:uid', drConsController.getDCbyUserId);
router.get('/:did', drConsController.getDCbyId);


router.post('/', drConsController.createDC)

module.exports = router