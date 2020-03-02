const app = require('./app')
const supertest = require('supertest')

describe('GET requests', () => {
    describe('/project', () => {
        describe('should return success status 200', () => {

        })
        describe('should return list of current projects', () => {

        })
    } )

    describe('/project/:id', () => {
        describe('when id exists', () => {

        })

        describe('when id does not exist', () => {
            describe('should return status 404', () => {

            })

            describe('should return appropriate message', () => {

            })
        })
    } )
})


describe('POST requests', () => {
    describe('/project', () => {
        describe('should create new project', () => {

        })
    })
})