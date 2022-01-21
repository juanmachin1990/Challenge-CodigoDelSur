const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movies.js')
const verifyToken = require('../middlewares/verifyToken.js')



module.exports = router

router.get('/movies', verifyToken.verifyToken, function (req, res) {
    movieController.getAllMovies(req, res)
})

router.post('/add-to-favorites', verifyToken.verifyToken, function (req, res) {
    movieController.addToFavorites(req, res)
})

router.get('/get-favorites', verifyToken.verifyToken, function (req, res) {
    movieController.getFavorites(req, res)
})
