

let response=(err,message,status,data)=>{
    let generate={
        err:err,
        message:message,
        status:status,
        data:data
    }
    return generate;
}

module.exports={
    response:response
}