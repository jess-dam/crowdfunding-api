const mongoose = require('mongoose')
const Pledge = require('./Pledge.model')
const Project = require('../project/Project.model')
const User = require('../user/User.model')

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/buildr-pledge-model-test`
  await mongoose.connect(url, { useNewUrlParser: true })
})
describe('ProjectModel', () => {
    let user, project
    describe('basic database operations', () => {
        beforeAll(async (done) => {
          await Pledge.deleteMany({})
          user = await User.create({email: 'sgshgsl', password: 'njgbnsdgl'})
          project = await Project.create({name: 'ksdhflks', createdBy: user._id})
          done()
        })
        test('creates a database entry', async () => {
          await Pledge.create({
            projectId: project._id,
            userId: user._id,
            amount: 100
          })
          const allPledges = await Pledge.find({})
          expect(allPledges).toHaveLength(1)
        })
      })
})