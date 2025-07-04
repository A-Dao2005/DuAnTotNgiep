const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

router.get('/', productCtrl.getProducts);
router.get('/category/:category', productCtrl.getProductsByCategory);
router.get('/search', productCtrl.searchProducts);
router.post('/', productCtrl.addProduct);
router.put('/:id', productCtrl.updateProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;
