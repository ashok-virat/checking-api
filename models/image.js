const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let statusdetails=new Schema({
    statusId:{
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
    status:{
        type:String,
        required:true
    },
    postType:{
      type:String,
      default:''
    },
    likes:{
        type:String,
        default:''
    },
    comments:{
        type:String,
        default:''
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})


mongoose.model('status',statusdetails)
