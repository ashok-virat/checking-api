const controller=require('./../controller/userController');
const apiversion=require('./../config/appconfig')
const multer=require('multer');


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
}) 

const fileFilter=(req,file,cb)=>{
    if(file.mimetype=='image/png' || file.mimetype=='image/jpeg' || file.mimetype=='image/jpg'){
        cb(null,true)
    }
    else {
        cb(null,false)
    }
 }
const uploads=multer({storage:storage,
    limits:{
    fileSize:1024 * 1024 * 5
           },
    fileFilter:fileFilter
});

const setRouter=(app)=>{
    let baseurl=apiversion.apiVersion;
   app.post(`${baseurl}/signup`,controller.signup);

   app.post(`${baseurl}/signin`,controller.login)
   app.post(`${baseurl}/poststatus/:userId`,controller.createtextstatus)
   app.post(`${baseurl}/postimage/:userId`,uploads.single('attr'),controller.storeimage);
   app.get(`${baseurl}/text`,controller.getalltext)
   app.get(`${baseurl}/image`,controller.getallimage)
   app.get(`${baseurl}/singletext/:statusId`,controller.getsingletext);
   app.get(`${baseurl}/singleimage/:statusId`,controller.getsingleimage);
   app.post(`${baseurl}/delete/text/:statusId`,controller.deletetext);
   app.post(`${baseurl}/delete/image/:statusId`,controller.deleteimage);
   app.post(`${baseurl}/forgotpassword`,controller.forgotpassword)
}


module.exports={
    setRouter:setRouter
}