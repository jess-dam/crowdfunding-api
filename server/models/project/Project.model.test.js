const mongoose = require('mongoose')
const Project = require('./Project.model')
const User = require('../user/User.model')

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/buildr-project-model-test`
  await mongoose.connect(url, { useNewUrlParser: true })
})
describe('ProjectModel', () => {
  describe('basic database operations', () => {
      let user
      beforeAll(async (done) => {
        await Project.deleteMany({})
        user = await User.create({email: 'sgshgsl', password: 'njgbnsdgl'})
        done()
      })
      test('creates a database entry', async () => {
        await Project.create({
          name: 'First project',
          createdBy: user._id
        })
        const allProjects = await Project.find({})
        expect(allProjects).toHaveLength(1)
      })
    })
})
