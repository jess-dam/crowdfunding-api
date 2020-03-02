const mongoose = require('mongoose')

const PledgeSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId },
    amount: {type: Number }
})

const PledgeModel = mongoose.model('Pledge', PledgeSchema)

module.exports = PledgeModel