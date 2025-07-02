const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

router.get('/', productCtrl.getProducts);
router.post('/', productCtrl.addProduct);
router.put('/:id', productCtrl.updateProduct);
router.delete('/:id', productCtrl.deleteProduct);
router.get('/search', productCtrl.searchProducts);

module.exports = router;
