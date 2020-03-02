const User = require('../models/user/User.model')

const signUp = async (req, res, next) => {
    if((!req.body.email) || (!req.body.password)) {
        res.status(400).json({
            status: 'failed',
            message: 'Email or password has not been specified'
        })
    }

    console.log(req.body)

    try {
        const { username, email, password } = req.body

        console.log('creating user ', req.body)
        const user = await User.create({
            username,
            email,
            password
        })

        console.log(user)

        const token = user.generateAuthToken()

        console.log(token)

        res.status(201).json({
            status: 'success',
            message: 'New user created',
            token
        })

        return

    } catch {
        res.status(400).json({
            status: 'failed',
            message: 'Could not create a new user, a user with this email may already exist'
        })
    }
}

const signIn = async (req, res, next) => {

}

const signOut = async (req, res, next) => {}


module.exports = {
    signUp,
    signIn,
    signOut
}