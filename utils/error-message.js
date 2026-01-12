function errorMsg(msg,status){
    const error = new Error(msg)
    error.status = status
    error.message = msg
    return error
}

module.exports = errorMsg