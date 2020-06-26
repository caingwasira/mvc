const express = require('express')
const path = require('path')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'hbs')

// Routes
const router = require('./routes/router')

app.use('/', router)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))