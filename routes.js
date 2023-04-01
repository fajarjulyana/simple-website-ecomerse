const isAuth = require('../middleware/is-auth');

router.post('/cart', isAuth, shopController.postCart);
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);
router.get('/checkout', isAuth, shopController.getCheckout);
router.get('/orders', isAuth, shopController.getOrders);
