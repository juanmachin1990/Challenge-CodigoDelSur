const express = require('express')
const app = express()
const path = require('path')
const userRoutes = require('./routes/users.js')
const moviesRoutes = require('./routes/movies.js')
const morgan = require('morgan')
const tmdbAPI = require('./tmdbAPI')
const bodyParser = require('body-parser')

//Settings 
app.set('port', 3000)

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

//Routes
app.use(userRoutes)
app.use(moviesRoutes)

app.listen(app.get('port'), ()=>{
    console.log('Server running at port ' + app.get('port'))
})

module.exports = app

