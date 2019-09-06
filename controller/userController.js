const mongoose=require('mongoose');
const userpath=require('./../models/user')
const logger=require('./../Libs/loggerLib')
const response=require('./../Libs/responseLib')
const validateemail=require('./../Libs/paramsValidation')
const check=require('./../Libs/checkLib')
const usermodel=mongoose.model('User');
const shortid=require('shortid')
const passwordgenerater=require('./../Libs/passwordgenrate')
const tokenLib=require('./../Libs/tokenLib')
const Authpath=require('./../models/Token')
const statuspath=require('./../models/image')
const imagepath=require('./../models/realimage')

const AuthModel=mongoose.model('AuthToken')
const statusModel=mongoose.model('status')
const imageModel=mongoose.model('images')
let nodemailer=require('nodemailer');
let signup=(req,res)=>{
    
    let validateuseremail=()=>{
        return new Promise((resolve,reject)=>{
            if(req.body.email){
                console.log(req.body)
            if(!validateemail.Email(req.body.email)){
                
                 let apiResponse=response.response(true,'email does not meet requirement',404,null)
                 reject(apiResponse)     
            }
            else if(check.isEmpty(req.body.email)){
                let apiResponse=response.response(true,'email is not there',400,null);
                reject(apiResponse)
            }
            else{
                resolve(req)
            }
            }
            else {
                let apiResponse=response.response(true,'email parameter is missing',403,null)
                reject(apiResponse)
            }
        })
    }

   let validatepassword=()=>{
       return new Promise((resolve,reject)=>{
           if(req.body.password){
               if(!validateemail.password(req.body.password)){
                let apiResponse=response.response(true,'password does not meet requirement',404,null)
                reject(apiResponse)     
           }
           else if(check.isEmpty(req.body.email)){
               let apiResponse=response.response(true,'password is not there',400,null);
               reject(apiResponse)
           }
           else{
               resolve(req)
           }
           }
           else {
               let apiResponse=response.response(true,'password parameter is missing',403,null)
               reject(apiResponse)
           }
           
       })
   }

   let createUser=()=>{
       return new Promise((resolve,reject)=>{
           usermodel.findOne({email:req.body.email})
           .exec((err,emailDeatils)=>{
               if(err){
                   let apiResponse=response.response(true,err.message,400,null)
                   reject(apiResponse)
               }
               else if(check.isEmpty(emailDeatils)){
                   let createuser=new usermodel({
                            userId:shortid.generate(),
                            firstName:req.body.firstName,
                            lastName:req.body.lastName,
                            email:req.body.email,
                            password:passwordgenerater.passwordgeneration(req.body.password),
                            createdOn:Date.now()
                   })
                   createuser.save((err,createuser)=>{
                       if(err){
                           let apiResponse=response.response(true,err.message,403,null)
                           reject(apiResponse)
                       }
                       else{
                           let object=createuser.toObject();
                           console.log(object)
                           resolve(object)
                           
                       }
                   })
               }
               else {
                   let apiResponse=response.response(true,'email is already present',500,null)
                   reject(apiResponse)
               }
           })
       })
   }

       validateuseremail(req,res)
       .then(validatepassword)
       .then(createUser)
       .then((resolve)=>{
           delete resolve.password;
           let apiResponse=response.response(false,'signup succesfully',200,resolve)
           res.send(apiResponse)
       })
       .catch((reject)=>{
           console.log(reject)
           res.send(reject)
       })
}

let login=(req,res)=>{
    
    let checkemail=()=>{
        return new Promise((resolve,reject)=>{
             if(req.body.email){
                 usermodel.findOne({email:req.body.email},(err,result)=>{
                     if(err){
                      
                         let apiResponse=response.response(true,err.message,404,null)
                         reject(apiResponse)
                     }
                     else if(check.isEmpty(result)){
                         let apiResponse=response.response(true,'user not found',400,null)
                         reject(apiResponse)
                     }
                     else {
                         
                         resolve(result)
                     }
                 })
             }
             else {
                 let apiResponse=response.response(true,'Email parameter is missing',500,null)
                 reject(apiResponse)
             }
        })
    }
    let checkpassword=(userDetails)=>{
        return new Promise((resolve,reject)=>{
            if(req.body.password){
                passwordgenerater.comparepassword(req.body.password,userDetails.password,(err,result)=>{
                
                    if(err){
                        console.log('checkpassword')
                        console.log(err)
                        let apiResponse=response.response(true,"password is not match",404,null)
                        reject(apiResponse)
                    }
                    else if(result){
                        console.log('result')
                        let newuserDetails=userDetails.toObject();
                        delete newuserDetails.password;
                        delete newuserDetails.__v;
                        delete newuserDetails._id;
                        resolve(newuserDetails);
                    }
                    else {
                      
                        let apiResponse=response.response(true,'Log In Failed.Wrong Password',400,null)
                        reject(apiResponse)
                    }
                })
            }
            else {
                let apiResponse=response.response(true,'passeord parrameter is missing',404,null)
                reject(apiResponse)
            }
        })
    }
       
    checkemail(req,res)
    .then(checkpassword)
    .then((resolve)=>{
        
        let apiResponse=response.response(false,'signin successfully',200,resolve);
        res.send(apiResponse)
    })
    .catch((reject)=>{
  
    res.send(reject)
   
    })
}

let createtextstatus=(req,res)=>{
       usermodel.findOne({userId:req.params.userId},((err,result)=>{
           if(err){
            let apiResponse=response.response(true,'User Is Not Found',404,null)
            res.send(apiResponse)
           }
else if(result) {
    console.log(result)
  
    let status=new statusModel({
        statusId:shortid.generate(),
        firstName:result.firstName,
        lastName:result.lastName,
        status:req.body.status,
        postType:req.body.postType,
        likes:req.body.likes,
        comments:req.body.comments
    })
    status.save((err,result)=>{
        if(err){
            let apiResponse=response.response(true,err.message,404,null)
            res.send(apiResponse)
        }
        else {
            let apiResponse=response.response(false,'User status is uploadad',404,result)
            res.send(apiResponse)
        }
    })
}
       }))
  

}





let storeimage=(req,res)=>{
   console.log(req)
   console.log(req.body.path)
   console.log(req.body.userId)
   usermodel.findOne({userId:req.params.userId},((err,result)=>{
    if(err){
     let apiResponse=response.response(true,'User Is Not Found',404,null)
     res.send(apiResponse)
    }
else if(result) {
console.log(result)

let status=new imageModel({
 statusId:shortid.generate(),
 firstName:result.firstName,
 lastName:result.lastName,
 image:req.file.path,
 postType:req.body.postType,
 likes:req.body.likes,
 comments:req.body.comments
})
status.save((err,result)=>{
 if(err){
     let apiResponse=response.response(true,err.message,404,null)
     res.send(apiResponse)
 }
 else {
     let apiResponse=response.response(false,'User image is uploadad',404,result)
     res.send(apiResponse)
 }
})
}
}))

   
}
    

let getalltext=(req,res)=>{
     statusModel.find()
     .select('-_id -__v')
     .lean()
     .exec((err,result)=>{
         if(err){
            let apiResponse=response.response(true,err.message,404,null)
            res.send(apiResponse)
         }
         else{
            let apiResponse=response.response(false,'get all text status successfully',404,result)
            res.send(apiResponse)
         }
     })
}

let getallimage=(req,res)=>{
    imageModel.find()
    .select('-_id -__v')
    .lean()
    .exec((err,result)=>{
        if(err){
           let apiResponse=response.response(true,err.message,404,null)
           res.send(apiResponse)
        }
        else{
           let apiResponse=response.response(false,'get all status successfully',404,result)
           res.send(apiResponse)
        }
    })
}

let getsingletext=(req,res)=>{
    statusModel.findOne({statusId:req.params.statusId},(err,result)=>{
         if(err){
            let apiResponse=response.response(true,err.message,404,null)
            res.send(apiResponse)
         } else{
            let apiResponse=response.response(false,'get text successfully',404,result)
            res.send(apiResponse)
         }
    })
    .select('-_id -__v')
}
let getsingleimage=(req,res)=>{
    imageModel.findOne({statusId:req.params.statusId},(err,result)=>{
         if(err){
            let apiResponse=response.response(true,err.message,404,null)
            res.send(apiResponse)
         } else{
            let apiResponse=response.response(false,'get image successfully',404,result)
            res.send(apiResponse)
         }
    })
    .select('-_id -__v')
}
let deletetext=(req,res)=>{
    statusModel.remove({statusId:req.params.statusId},(err,result)=>{
        if(err){
            let apiResponse=response.response(true,err.message,404,null)
            res.send(apiResponse)
        }
        else{
            let apiResponse=response.response(false,'deleted successfully',404,result)
            res.send(apiResponse)
         }
    })
}

let deleteimage=(req,res)=>{
    imageModel.remove({statusId:req.params.statusId},(err,result)=>{
        if(err){
            let apiResponse=response.response(true,err.message,404,null)
            res.send(apiResponse)
        }
        else{
            let apiResponse=response.response(false,'deleted successfully',404,result)
            res.send(apiResponse)
         }
    })
}


let forgotpassword=(req,res)=>{
    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'aruashok17@gmail.com',
            pass:'viratashok01'
        }
    });
    let mailOptions={
        from:'"Ashok TODO APP"',
        to:req.body.email,
        subject:'"Welcome to Ak-TODO app"',
        text:'email varuth'
    }
    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log('Error occures');
            console.log(err)
        }
        else {
            console.log('email send')
            res.send('email is send')
        }
    })
}

module.exports={
    signup:signup,
    login:login,
    createtextstatus:createtextstatus,
    storeimage:storeimage,
  getalltext:getalltext,
  getallimage:getallimage,
  getsingletext:getsingletext,
  getsingleimage:getsingleimage,
  deletetext:deletetext,
  deleteimage:deleteimage,
  forgotpassword:forgotpassword
}