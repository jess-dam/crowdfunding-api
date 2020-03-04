const app = require('./app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('./models/user/User.model')
const Project = require('./models/project/Project.model')


const ADMIN_USER = {
    username: 'Ada1809',
    email: 'ada@adaada.com',
    password: 'adalovesmaths',
    permissionType: 'ADMIN'
}

const DEFAULT_USER = {
    username: 'Grace1973',
    email: 'grace@gracegrace.com',
    password: 'gracehatesbugs'
}

const DEFAULT_PROJECT = {
    name: 'An Example project'
}

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/buildr-project-test`
    await mongoose.connect(url, { useNewUrlParser: true })
})


describe.only('GET requests', () => {
    describe('/project', () => {
        let res
        beforeAll( async (done) => {
            await givenDBIsEmpty()
            const admin = await User.create(ADMIN_USER)
            await givenAProject(admin)
            res = await supertest(app).get('/project')
            done()
        })

        test('should return success status 200', () => {
            expect(res.status).toBe(200)
        })
        test('should return list of current projects', () => {
            expect(res.body).toMatchObject({
                status: 'success',
                message: 'Successfully fetched projects',
                projects: [DEFAULT_PROJECT]
            })
        })
    })

    describe('/project/:id', () => {
        describe('when id exists', () => {
            let res
            beforeAll( async (done) => {
                await givenDBIsEmpty()
                const admin = await User.create(ADMIN_USER)
                const project = await givenAProject(admin)
                res = await supertest(app).get(`/project/${project._id}`)
                done()
            })
            test('should return success status 200', () => {
                expect(res.status).toBe(200)
            })

            test('should return the project with appropriate message', () => {
                expect(res.body).toMatchObject({
                    status: 'success',
                    message: 'Successfully fetched project',
                    projects: [DEFAULT_PROJECT]
                })
            })
        })

        describe('when id does not exist', () => {
            let res
            beforeAll( async (done) => {
                await givenDBIsEmpty()
                const admin = await User.create(ADMIN_USER)
                await givenAProject(admin)
                res = await supertest(app).get(`/project/35nkn3k5`)
                done()
            })
            test('should return status 404', () => {
                expect(res.status).toBe(404)
            })

            test('should return appropriate message', () => {
                expect(res.body).toMatchObject({
                    status: 'failed',
                    message: 'Could not find a project with this ID'
                })
            })
        })
    } )
})


describe('POST requests', () => {
    describe('/project', () => {
        describe('when user has a admin account', () => {
            let res
            beforeAll( async (done) => {
                await givenDBIsEmpty()
                const admin = await User.create(ADMIN_USER)
                res = await supertest(app).post(`/project`).send({
                    name: 'An New Project',
                    createdBy: admin._id
                })
                done()
            })

            test('should return success status 201', () => {
                expect(res.status).toBe(201)
            })
            test('should create new project', () => {
                expect(res.body).toMatchObject({
                    status: 'success',
                    message: 'Project has been created'
                })
            })
        })

        describe('when user has default account', () => {
            let res, projectsBefore, projectsAfter
            beforeAll( async (done) => {
                await givenDBIsEmpty()
                const defaultUser = await User.create(DEFAULT_USER)
                projectsBefore = await Project.find({})
                res = await supertest(app).post(`/project`).send({
                    name: 'An New Project',
                    createdBy: defaultUser._id
                })
                projectsAfter = await Project.find({})
                done()
            })
            test('should return failure status 401', () => {
                expect(res.status).toBe(401)
            })
            test('should return appropriate message', () => {
                expect(res.body).toMatchObject({
                    status: 'failed',
                    message: 'Could not create a new project, only admin users can create a new project'
                })
            })

            test('should not create a new project', () => {
                expect(projectsAfter).toHaveLength(projectsBefore.length)
            })
        })
    })
})

const givenDBIsEmpty = async () => {
    await User.deleteMany({})
    await Project.deleteMany({})
}

const givenAProject = async (admin) => {
    //user required to be able to create a project
    const project = await Project.create({
        name: DEFAULT_PROJECT.name,
        createdBy: admin._id
    })

    return project
}