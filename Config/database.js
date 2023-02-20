const mongoose = require('mongoose')

// connection
mongoose.connect('mongodb://127.0.0.1:27017/ToDo',{useNewUrlParser: true, useUnifiedTopology: true} , (err)=> {

    if (err) {
        console.log(err)
    } else {
        console.log('connected to db succcesfuly...')
    }
})