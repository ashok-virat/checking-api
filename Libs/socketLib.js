const socket=require('socket.io');



let createserver=(server)=>{
    let io=socket.listen(server);
    let myio=io.of('');

    
    myio.on('connection',(socket)=>{
        console.log('on connection--emitting verify user');

        socket.emit('verifyUser','');
        //coder to verify the user and make him online

        socket.on('set-user',(data)=>{
            console.log(data)
        })
    })
}


module.exports={
    createserver:createserver
}