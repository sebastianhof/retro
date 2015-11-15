var passport = require('passport');
var userDatastore_1 = require("./datastores/userDatastore");
var userDatastore_2 = require("./datastores/userDatastore");
/**
 * User account management
 */
var Users = (function () {
    function Users(app) {
        app.post('/api/signin', passport.authenticate('local', {
            successRedirect: '/#/dashboard',
            failureRedirect: '/#/signinError'
        }));
        app.get('/api/signout', function (req, res) {
            req.logout();
            res.redirect('/');
        });
        // add admin user
        var bcrypt = require('bcrypt-nodejs');
        var user = {
            username: 'admin',
            password: bcrypt.hashSync("retro"),
            role: userDatastore_2.UserRole.ADMIN,
            firstname: 'Retro',
            lastname: 'Administrator',
            email: 'admin@retro'
        };
        userDatastore_1.UserDatastore.getInstance().addUser(user).then(function (user) {
            console.log('Admin user successfully created');
        });
    }
    return Users;
})();
exports.Users = Users;
