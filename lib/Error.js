class CustomError extends Error {
    constructor(code, message, description) {
        super(`{"code": "${code}", "message": "${code}", "description": "${description}" )}`);
        this.code = code;
        this.message = message;
        this.description = description;
    }
}
module.exports = CustomError;
