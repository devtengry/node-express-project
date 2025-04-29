const CustomError = require("./Error");
const Enum = require('../config/enum');

class Response {
    constructor() {}

    static succesResponse(data, code = 200){
        return{
            code,
            data
        }
    }

   

    static errorResponse(code, error){
        console.error(error);
        if (error instanceof CustomError) {
            
        return{
            code: error.code,
            error: {
                message: error.message,
                description: error.description,
            }
        }
        }else{

        return{
            code: Enum.HTTP_CODES.INT_SERVER_ERROR,
            error: {
                message: "Unknown Error!",
                description: error.message,
            }
        }
        }

    }
}

module.exports = Response;