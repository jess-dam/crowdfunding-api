const User = require('../models/user/User.model')
const bcrypt = require('bcrypt')

const signUp = async (req, res, next) => {
    if((!req.body.email) || (!req.body.password)) {
        res.status(400).json({
            status: 'failed',
            message: 'Email or password has not been specified'
        })
    }

    try {
        const { username, email, password } = req.body

        const user = await User.create({ username, email, password })
        const token = user.generateAuthToken()

        res.status(201).json({
            status: 'success',
            message: 'New user created',
            token
        })

    } catch {
        res.status(400).json({
            status: 'failed',
            message: 'Could not create a new user, a user with this email may already exist'
        })
    }
}

const signIn = async (req, res, next) => {
    if(!req.body) {
        res.status(400).json({
            status: 'failed',
            message: 'No credentials specified'
        })
    }

    const user = await User.findOne({email: req.body.email})


    if(!user) {
        res.status(404).json({
            status: 'failed',
            message: 'Could not find this user'
        })
    }


    try {
        // const correctPassword = await user.verifyCorrectPassword(req.body.password)
        await bcrypt.compare(req.body.password, user.password, (err, same) => {
            if(same == true) {
                const token = user.generateAuthToken()
                res.status(202).json({
                    status: 'success',
                    message: 'Sign in credentials accepted',
                    token
                })
            } else {
                console.log(err)
                res.status(401).json({
                    status: 'failed',
                    message: 'Incorrect email or password'
                })
            }
        })
    } catch {
        res.status(424).json({
            status: 'failed',
            message: 'Could not verify credentials'
        })
    }
}

const signOut = async (req, res, next) => {}


module.exports = {
    signUp,
    signIn,
    signOut
}