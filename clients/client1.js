const socket=io('http://localhost:3000')

let authtoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlBNdW9WNzJONSIsImlhdCI6MTU2MzE4Nzk5OTI1OCwiZXhwIjoxNTYzMjc0Mzk5LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7ImZpcnN0TmFtZSI6IiIsImxhc3ROYW1lIjoiIiwiZW1haWwiOiJ2aXJhdEBnbWFpbC5jb20iLCJ1c2VySWQiOiJ5UzVLaHVJNy0iLCJjcmVhdGVkT24iOiIyMDE5LTA3LTE1VDA4OjQ1OjIxLjQ1NVoifX0.K9CPt_JRgMBcrEGKtd5GPra5D7PH2ZonKCQC_FLgzdU"

let chatsocket=()=>{
    socket.on('verifyUser',(data)=>{
        console.log('socket trying to verify user');
        socket.emit("set-user",authtoken);
    })
}


chatsocket();