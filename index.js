const express=require('express');
const user=require('./routes/user');
const appErrorHandler=require('./middlewares/appErrorHandler');
const logip=require('./middlewares/routelogger')
const app=express();
const fs=require('fs')
const multer=require('multer');
const http=require('http')
const config=require('./config/appconfig')
const logger=require('./Libs/loggerLib')
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const userdetails=require('./models/user')
const tokenpath=require('./Libs/checkingjwt')
const passwordpath=require('./Libs/passwordgenrate')
let baseurl=config.apiVersion;



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('upload'))
app.use(cookieParser())

app.use(appErrorHandler.globalErrorHandler)
app.use(logip.logIp)

user.setRouter(app)

app.use(appErrorHandler.globalNotFoundHandler)

const server=http.createServer(app)
//start listening to http server

server.listen(config.port)
server.on('error', onError)
server.on('listening', onListening)
//end server listening code
const socket=require('./Libs/socketLib')
socket.createserver(server);

//error listener for http server 'error' event.
function onError(error){
    if(error.syscall !== 'listen')  {
        logger.captureError(error.code+'not equal Listen','serverOnErrorHandler',10)
        throw error;
    }
    switch(error.code) {
        case 'EACCES':
            logger.captureError(error.code+':elavated privilages required','serverOnErrorHandler',10)
            process.exit(1)
            break;
         case 'EADDRINUSE':
             logger.captureError(':port is already in use Ashok','serverOnErrorHandler',10)
             process.exit(1)
             break;
         default:
             logger.captureError(error.code+':some unknown error occured','serverOnErrorHandler',10)       
    }
}

//event listener for Http server 'listening' event;
    function onListening(){
        var addr=server.address()
        var bind=typeof addr === 'string'?'pipe'+addr:'port'+addr.port;
        ('Listening on'+bind)
        console.log(bind)
        logger.captureInfo('server listening on port'+addr.port,'serverListeningHandler',10)
    }
process.on('unhandledRejection',(reason,p)=>{
    console.log('unhandled Rejection at: Promise',p,'reason:',reason)
})

mongoose.connect(config.db.uri, {useNewUrlParser: true});


mongoose.connection.on('error',function(err){
    console.log('database connection is error')
    console.log(err)
})

mongoose.connection.on('open',function(err){
   if(err){ 
       console.log('database error')
       console.log(err)
   } else {
       console.log('database connection is open success ')
   }
})