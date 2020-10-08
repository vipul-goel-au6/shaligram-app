const speakeasy = require("speakeasy")

module.exports = {
    generateOtp(){
        const secret = speakeasy.generateSecret({length: 20}).base32
        const token = speakeasy.totp({
            secret: secret,
            encoding: 'base32',
        })
        return { secret, token }
    },

    verifyOtp(secret,token){
        const verified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: token,
            window: 4
        })
        return verified
    }
}