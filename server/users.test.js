const supertest = require('supertest')
const app = require('./app')
const User = require('./models/user/User.model')
const mongoose = require('mongoose')

const DEFAULT_USER = {
    username: 'alice',
    email: 'alice@helloalice.com',
    password: 'alicelikescookies'
}

const ADMIN_USER = {
    username: 'grace',
    email: 'grace@hellograce .com',
    password: 'gracelikescookies',
    permissionType: 'ADMIN'
}

// describe('GET /users', () => {
//     describe('/users/currentUser', () => {
//         beforeAll(() => {

//         })

//         describe('success status 200 is returned', () => {

//         })

//         describe('current user id is returned', () => {

//         })
//     })
// })

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/buildr-user-test`
    await mongoose.connect(url, { useNewUrlParser: true })
})

describe('POST /users', () => {
    describe('/signup', () => {
        describe('with username, email and password', () => {
            let res
            beforeAll(async (done) => {
                await givenUserDbIsEmpty()
                console.log('about to sign up new user')
                res = await supertest(app).post('/users/signup').send(DEFAULT_USER)
                done()
            })

            test('should return success status 201', () => {
                expect(res.status).toBe(201)
            })

            test('should return appropriate message and token', () => {
                expect(res.body.message).toBe('New user created')
                expect(typeof res.body.token).toBe('string')
            })

        })

        describe('with just username and password', () => {
            let res
            beforeAll(async (done) => {
                await givenUserDbIsEmpty()
                res = await supertest(app).post('/users/signup').send({
                        username: 'blah',
                        password: 'blah'
                    })
                done()
                })

            test('should return failed status 400', () => {
                expect(res.status).toBe(400)
            })

            test('should return appropriate message', () => {
                expect(res.body).toMatchObject({
                    status: 'failed',
                    message: 'Email or password has not been specified'
                })
            })
    })

    describe('/signin', () => {
        beforeAll(() => {

        })

        describe('with correct username and password', () => {

        })

        describe('with incorrect password', () => {

        })
    })

    describe('/signout', () => {
        describe('when signed in', () => {

        })

        describe('when not signed in', () => {

        })
    })
})

})

const givenUserDbIsEmpty = async () => {
    await User.deleteMany({})
}