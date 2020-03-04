const Project = require('../models/project/Project.model')

const getProjects = async (req, res, next) => {
    const allProjects = await Project.find({})
    res.status(200).json({
        status: 'success',
        message: 'Successfully fetched projects',
        projects: allProjects
    })
}

const getProjectById = async (req,res, next) => {
    try {
        const project = await Project.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            message: 'Successfully fetched project',
            projects: [project]
        })

    } catch {
        res.status(404).json({
            status: 'failed',
            message: 'Could not find a project with this ID'
        })
    }

}

const createProject = async (req, res, next) => {
    try {
        const { name, createdBy, pledgeLog } = req.body
        const project = await Project.create({
            name,
            createdBy,
            pledgeLog
        })

        res.status(201).json({
            status: 'success',
            message: 'Project has been created'
        })
    } catch {
        res.status(400).json({
            status: 'failed',
            message: 'Could not create a new project, only admin users can create a project'
        })
    }
}

module.exports = {
    getProjects,
    getProjectById,
    createProject
}