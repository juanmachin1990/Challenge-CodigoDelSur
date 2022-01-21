const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/users')
const res = require('express/lib/response')
const fs = require('fs')

const users = []

login = function (req, res) {
    var i = 0
    var foundUser = false
    while (i < users.length && !foundUser) {
        if (users[i].email !== req.body.email) {
            i++
        } else {
            foundUser = true
            if (bcrypt.compareSync(req.body.password, users[i].password)) {
                jwt.sign({ user: users[i] }, 'secret-key', (err, token) => {
                    res.send({ token: token })
                })
            } else {
                res.status(401).send('Incorrect password')
            }
        }

    }
    if (!foundUser) {
        res.status(404).send('User not found')
    }
}

emailAlreadyInUse = function (req, res) {
    for (let i = 0; i < users.length; i++) {
        if (req.body.email == users[i].email) {
            return true
        }
    }
    return false
}


register = function (req, res) {
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
        res.status(400).send('Fill in all fields')
    } else {
        if (emailAlreadyInUse(req, res)) {
            res.status(409).send('Email already in use')
        } else {
            users.push(user)
            const json_users = JSON.stringify(users)
            fs.writeFileSync('src/data/users.json', json_users, 'utf-8')
            res.send('User succesfully registered')
        }
    }
}



module.exports = { register, login }
