const User = require('./user');

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Sign Up',
    path: '/signup'
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      const user = new User({
        email: email,
        password: password,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
path: '/login'
});
};
exports.postLogin = (req, res, next) => {
const email = req.body.email;
const password = req.body.password;
User.findOne({ email: email })
.then(user => {
if (!user) {
return res.redirect('/login');
}
bcrypt
.compare(password, user.password)
.then(doMatch => {
if (doMatch) {
req.session.isLoggedIn = true;
req.session.user = user;
return req.session.save(err => {
console.log(err);
res.redirect('/');
});
}
res.redirect('/login');
})
.catch(err => {
console.log(err);
res.redirect('/login');
});
})
.catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
req.session.destroy(err => {
console.log(err);
res.redirect('/');
});
};
