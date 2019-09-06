const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let UserDetails=new Schema({
    userId:{
        type:String,
        unique:true
    },
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})


mongoose.model('User',UserDetails)
