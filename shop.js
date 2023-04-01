const Product = require('./product');

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        products: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.postOrder = (req, res, next) => {
req.user
.populate('cart.items.productId')
.execPopulate()
.then(user => {
const products = user.cart.items.map(item => {
return { quantity: item.quantity, product: { ...item.productId._doc } };
});
const order = new Order({
user: {
email: req.user.email,
userId: req.user
},
products: products
});
return order.save();
})
.then(result => {
return req.user.clearCart();
})
.then(() => {
res.redirect('/orders');
})
.catch(err => {
console.log(err);
});
};
exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
