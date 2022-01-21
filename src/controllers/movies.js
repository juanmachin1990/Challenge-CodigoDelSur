const fs = require('fs')
const getApiMovies = require('../tmdbAPI')
const movies = require('../data/movies.json')
const Movie = require('../models/movies.js')
const movies_suggestions = require('../data/movies_suggestion.json')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')


const films = []
const favorites = []


getAllMovies = function (req, res) {
        jwt.verify(req.token, 'secret-key', (err) => {
                if (err) {
                        res.status(401).send('An error has ocurred')
                } else {
                        getApiMovies()
                        const results = (movies["results"])
                        for (const i in results) {
                                const suggestion_score = Math.random() * 100
                                const film = new Movie({
                                        tmdbId: results[i]["id"],
                                        originalTitle: results[i]["original_title"],
                                        suggestionScore: suggestion_score
                                })

                                films.push(film)
                        }
                        films.sort((p1, p2) => {
                                if (p1.suggestionScore < p2.suggestionScore) {
                                        return 1
                                } else if (p1.suggestionScore > p2.suggestionScore) {
                                        return -1
                                } else {
                                        return 0
                                }
                        })
                        const json_movies = JSON.stringify(films)
                        fs.writeFileSync('src/data/movies_suggestion.json', json_movies, 'utf-8')
                        res.send(json_movies)

                }
        })
}


movieAlreadyAdded = function (req, res) {
        for (let i = 0; i < favorites.length; i++) {
                if (req.body.id == favorites[i].id) {
                        return true
                }
        }
        return false
}


addToFavorites = function (req, res) {
        jwt.verify(req.token, 'secret-key', (err) => {
                if (err) {
                        res.status(401).send('An error has ocurred')
                } else {
                        try {
                                const found = films.find(film => {
                                        return film._id == req.body.id
                                })
                                const favorite = {
                                        id: found._id,
                                        originalTitle: found.originalTitle,
                                        suggestionScore: found.suggestionScore,
                                        addedAt: new Date()
                                }
                                if (movieAlreadyAdded(req, res)) {
                                        res.send("Movie already added to favorites")
                                } else {
                                        favorites.push(favorite)
                                }
                                favorites.sort((p1, p2) => {
                                        if (p1.suggestionScore < p2.suggestionScore) {
                                                return 1
                                        } else if (p1.suggestionScore > p2.suggestionScore) {
                                                return -1
                                        } else {
                                                return 0
                                        }
                                })
                                const json_favorites = JSON.stringify(favorites)
                                fs.writeFileSync('src/data/favorites.json', json_favorites, 'utf-8')
                                res.send('Movie successfully added to favorites')
                        } catch {
                                res.status(404).send('Movie not found')
                        }
                }


        })

}

getFavorites = function (req, res) {
        jwt.verify(req.token, 'secret-key', (err) => {
                if (err) {
                        res.status(401).send('An error has ocurred')
                } else {
                        for (i in favorites) {
                                const suggestionForTodayScore = Math.random() * 100
                                favorites[i]['suggestionForTodayScore'] = suggestionForTodayScore
                        }
                        favorites.sort((p1, p2) => {
                                if (p1.suggestionForTodayScore < p2.suggestionForTodayScore) {
                                        return 1
                                } else if (p1.suggestionForTodayScore > p2.suggestionForTodayScore) {
                                        return -1
                                } else {
                                        return 0
                                }
                        })
                        res.send(favorites)
                }
        })
}

module.exports = { getAllMovies, addToFavorites, getFavorites }