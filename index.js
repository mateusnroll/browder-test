const express    = require('express')
const app        = express()
const fs         = require('fs')
const handlebars = require('handlebars')
const { Page }   = require('./browder/index.js')

app.use(express.static('./build'))
app.get('/*', Page.handleRoute)
app.listen(3000, () => console.log('Listening on port 3000'))
