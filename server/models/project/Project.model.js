const mongoose = require('mongoose')


const ProjectSchema = new mongoose.Schema({
    name: {type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: 'true' },
    pledgeLog: { type: [mongoose.Schema.Types.ObjectId], default: [] }
})

const ProjectModel = mongoose.model('Project', ProjectSchema)

module.exports = ProjectModel