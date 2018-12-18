const bCrypt = require('bcrypt-nodejs');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (passport, user) => {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.use('jwt-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
        function (email, password, cb) {
            return User.findOne({where: { email }})
            .then(user => {
                if (!user || !bCrypt.compareSync(password, user.password)) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }
                return cb(null, user, {message: 'Logged In Successfully'});
            })
            .catch(err => {
                console.error('__Error', err);
                return cb(err)
            });
        }
    ));

    var opts = {}
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'sp@c3f1t';

    passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
        User.findOne({ where: {id: jwt_payload}}) 
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        }, function(req, email, password, done) {
            const generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    email
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    const userPassword = generateHash(password);
                    var data = {
                        email,
                        password: userPassword,
                        name: req.body.name,
                    };
             
                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
             
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
             
                }
             
            })
            .catch(err => {
                console.error('__error', err)
            })
        }
    ));

}