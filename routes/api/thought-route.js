const router = require('express').Router();
const{
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought
} = require('../../controllers/thoughtController')

//Get all thoughts and create a single thought route
router.route('/').get(getThoughts).post(createThought);

//Get single thought by Id
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// Create a new thought 

//Update a thought by it's id

// Delete a thought by it's id
module.exports = router;