var express = require('express')
var router = express.Router()
const ProjectControl = require('../controllers/project.control.js')

// GET
router.get('/', ProjectControl.getProjects)
router.get('/:id', ProjectControl.getProjectById)

// POST
router.post('/', ProjectControl.createProject)

module.exports = router;
