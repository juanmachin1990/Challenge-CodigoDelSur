const fetch = require('node-fetch')
const apiKey = '598c037c1665defaabed709f49b58951'
const fs = require('fs')

function getApiMovies(){
fetch('https://api.themoviedb.org/3/discover/movie?api_key=598c037c1665defaabed709f49b58951&language=en-US&sort_by=popularity.desc')
.then((respuesta)=>{
    return respuesta.json()
}).then((tmdb)=>{
    const json_movies = JSON.stringify(tmdb)
    fs.writeFileSync('src/data/movies.json', json_movies, 'utf-8' )
})
}

module.exports = getApiMovies

