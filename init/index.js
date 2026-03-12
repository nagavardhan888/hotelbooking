const mongoose = require('mongoose')
const initdata = require('./data')
const listing = require('../models/listing')
const url = "mongodb://127.0.0.1:27017/majorproject1"
async function connect(){
   await mongoose.connect(url)
}
connect()
.then(()=>{
        console.log("connected to the db")
    })
    .catch((err)=>{  
        console.dir(err)
    })
const initDB = async()=>{
    await listing.deleteMany({})
    await listing.insertMany(initdata.data)
    console.log("database initialized successfully")
}
initDB()