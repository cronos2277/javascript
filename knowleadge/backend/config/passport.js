const { authSecret } = require('../.env');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const {Strategy, ExtractJwt} = passportJwt;
module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    const strategy = new Strategy(params,(payload,done)=>{
        
    });
}