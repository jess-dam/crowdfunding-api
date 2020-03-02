const supertest = require('supertest')
const app = require('./app')


describe('POST /users', () => {
    describe('/signup', () => {
        beforeAll(() => {

        })

        describe('with username, email and password', () => {

        })

        describe('with just username and password', () => {

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