const shorid=require('shortid');
const jwt=require('./../Libs/tokenLib')
const password=require('./../Libs/passwordgenrate')

let data={
    userId:shorid.generate(),
    firstName:"Ashok",
    lastName:"virat",
    mobileNumber:"08975345"
}
console.log(data)
jwt.generateToken(data,(err,result)=>{
    if(err){
        console.log(err)
    }
    else {
        console.log(result)
    }
})

let message='i am ashok';

password.passwordgeneration(message,(err,result)=>{
    if(err){
        console.log(err)
    }
    else {
        console.log(result)
    }
})

let hasingpassword='$2b$10$xPmX/rUMhz.MaDm7otE3i.QT5wbhV6hdLY93RnlqeglzkBvnG6jAW';


password.comparepassword(message,hasingpassword,(err,result)=>{
    if(err){
        console.log(err)
    }
    else {
        console.log(result)
    }
})
