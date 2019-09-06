const mongoose=require('mongoose')

const Schema=mongoose.Schema;

let TokenDet=new Schema({
    userId:{
        type:String
    },
    Authtoken: {
        type:String
    },
    tokenSecret:{
        type:String
    },
    tokenGenerationTime:{
         type:Date,
         default:Date.now()
    }
})

mongoose.model('AuthToken',TokenDet)