const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Project = require('./Project.model')
const User = require('../user/User.model')

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/buildr-project-model-test`
  await mongoose.connect(url, { useNewUrlParser: true })
})
describe('Password storage', () => {
  let project
  beforeAll(async (done) => {
    const userToCreate = await User.create({username: 'jfkghds', password: 'jskghjlg'})
    const project = await Project.create({ name: 'bob948', createdBy: userToCreate});
    done()
  })
  it('does not store the plain text password', () => {
    expect(user.password).not.toBeUndefined()
    expect(user.password).not.toBe('je0few8')
  })
  it('specifically stores an encrypted version of the plaintext password', async () => {
    const isMatch = await bcrypt.compare('je0few8', user.password)
    expect(isMatch).toBeTruthy()
  })
})
