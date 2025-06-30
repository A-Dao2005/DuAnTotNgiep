const express = require('express');
const router = express.Router();
const catCtrl = require('../controllers/categoryController');

router.get('/', catCtrl.getCategories);
router.post('/', catCtrl.addCategory);
router.put('/:id', catCtrl.updateCategory);
router.delete('/:id', catCtrl.deleteCategory);

module.exports = router; 