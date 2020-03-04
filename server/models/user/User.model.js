const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userPermissionType = require('./userPermissions')

const UserSchema = new mongoose.Schema({
    username: { type: String, default: 'Anonymous' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required:true },
    permissionType: { type: String, enum: userPermissionType, default: 'DEFAULT' }
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
})

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign(this.id, process.env.JWT_SECRET)
}

UserSchema.methods.verifyCorrectPassword = async function (passwordAttempt) {
    console.log(passwordAttempt)

    const isCorrect = await bcrypt.compare(passwordAttempt, this.password, (err, result) => {
        if(result == true){
            return true
        } else {
            console.log(err)
            return false
        }
    })

    console.log(isCorrect)
    return isCorrect
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel