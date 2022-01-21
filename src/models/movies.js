const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    tmdbId: String,
    originalTitle: String,
    suggestionScore: Number
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie