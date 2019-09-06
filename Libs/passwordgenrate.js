const bcrypt=require('bcryptjs');
const saltRounds=6;


let hashpassword=(myPlianPassword)=>{
    let salt=bcrypt.genSaltSync(saltRounds);
    let hash=bcrypt.hashSync(myPlianPassword,salt);
    return hash;
}

let comparepassword=(mypassword,hasingpassword,cb)=>{
    bcrypt.compare(mypassword,hasingpassword,(err,res)=>{
        console.log('pssword compariosin is started')
        
         if(err){
             cb(err,null)
         }
       
         else {
             cb(null,res)
         }
    })
}

module.exports={
    passwordgeneration:hashpassword,
    comparepassword:comparepassword
}