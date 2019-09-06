const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let imagess=new Schema({
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
    image:{
        type:String,
        default:''
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


mongoose.model('images',imagess)
